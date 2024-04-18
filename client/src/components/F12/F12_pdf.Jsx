import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const handlePreviewPDF = (groupKey, organizedData, getBeneficiaryAddress) => {
    const pdf = new jsPDF();
    const titleText = 'Feuille d\'expedition des chargements du centre d\'ANTANANARIVO TRI';
    const descriptionText = 'VD des objets charges, lettres et paquets recommande, recouvrement - en precisant les envois contre remboursement';
  
    const maxWidthPercentage = 0.6;
  
    const titleFontSize = 16;
    const descriptionFontSize = 11;
  
    const maxTitleWidth = pdf.internal.pageSize.getWidth() * maxWidthPercentage;
    const maxDescriptionWidth = pdf.internal.pageSize.getWidth() * maxWidthPercentage;
  
    const titleLines = pdf.splitTextToSize(titleText, maxTitleWidth);
    const descriptionLines = pdf.splitTextToSize(descriptionText, maxDescriptionWidth);
  
    const titleY = 15;
    const descriptionY = titleY + titleLines.length * titleFontSize - 18;
  
    pdf.setFontSize(titleFontSize);
    pdf.text(titleLines, pdf.internal.pageSize.getWidth() / 2, titleY, { align: 'center' });
  
    pdf.setFontSize(descriptionFontSize);
    const lineHeight = -5;
  
    descriptionLines.forEach((line, index) => {
      pdf.text(line, pdf.internal.pageSize.getWidth() / 2, descriptionY + index * (descriptionFontSize + lineHeight), { align: 'center' });
    });
  
    const recapTitleWidth = 125.5;
    pdf.autoTable({
      startY: descriptionY + descriptionLines.length * descriptionFontSize - 10,
      head: [['                                         Récapitulation(en chiffre)']],
      headStyles: { fillColor: 'white', textColor: 'black', lineColor: 'black', lineWidth: 1 },
      bodyStyles: { lineWidth: 1 },
      tableWidth: recapTitleWidth,
      margin: { horizontal: (pdf.internal.pageSize.getWidth() - recapTitleWidth) / 2 },
    });
    const leftCircleX = 20;
    const leftCircleY = pdf.autoTable.previous.finalY + 5;
    const leftCircleRadius = 15;
    pdf.circle(leftCircleX, leftCircleY, leftCircleRadius);
    pdf.text('Timbre expediteur', leftCircleX, leftCircleY - leftCircleRadius - 2, { align: 'center' });

    const rightCircleX = pdf.internal.pageSize.getWidth() - 20;
    const rightCircleY = pdf.autoTable.previous.finalY + 5;
    const rightCircleRadius = 15;
    pdf.circle(rightCircleX, rightCircleY, rightCircleRadius);
    pdf.text('Timbre destinataire', rightCircleX, rightCircleY - rightCircleRadius - 2, { align: 'center' });

    const recapColumns = ['VD', 'LR', 'PR', 'Recouvrement', 'Objets Signalés'];
  
    let lineCount =organizedData[groupKey].length;
  
    const recapData = Array.from({ length: 1 }).map(() => ['', `${lineCount}`, '', '', '']);
  
    pdf.autoTable({
      startY: pdf.autoTable.previous.finalY + 0,
      head: [recapColumns],
      body: recapData,
      headStyles: { fillColor: 'white', textColor: 'black', lineColor: 'black', lineWidth: 1 },
      bodyStyles: { lineWidth: 1 },
      tableWidth: pdf.internal.pageSize.getWidth() * 0.60,
      columnStyles: {
        0: { cellWidth: pdf.internal.pageSize.getWidth() * 0.10 },
        1: { cellWidth: pdf.internal.pageSize.getWidth() * 0.10 },
        2: { cellWidth: pdf.internal.pageSize.getWidth() * 0.10 },
        3: { cellWidth: pdf.internal.pageSize.getWidth() * 0.15 },
        4: { cellWidth: pdf.internal.pageSize.getWidth() * 0.15 },
      },
      margin: { horizontal: (pdf.internal.pageSize.getWidth() - pdf.internal.pageSize.getWidth() * 0.60) / 2 },
    });
  
    pdf.text('', pdf.internal.pageSize.getWidth() / 2, pdf.autoTable.previous.finalY + 10);
  
    const agenceText = `Bureau d'origine: ${groupKey}`;
    pdf.text(agenceText, pdf.internal.pageSize.getWidth() / 2, pdf.autoTable.previous.finalY + 10, { align: 'center' });
  
    pdf.autoTable({
      startY: pdf.autoTable.previous.finalY + 20,
      head: [
        ["numero d'ordre", 'Expediteur', 'Destinataire', 'Lieux de destination', 'Num', 'Date', 'Montant'],
      ],
      body: organizedData[groupKey].map((envoi, index) => {
        return [
          index + 1,
          envoi.Env_exp,
          envoi.Env_dest,
          getBeneficiaryAddress(envoi.Env_dest),
          envoi.Env_num,
          envoi.Env_date_depot ? format(new Date(envoi.Env_date_depot), 'MM/dd/yyyy', { timeZone: 'Africa/Nairobi' }) : '',
          `${envoi.Env_taxe} Ar`,
        ];
      }),
      headStyles: { fillColor: 'white', textColor: 'black', lineColor: 'black', lineWidth: 1 },
      bodyStyles: { lineWidth: 1 },
    });
  
    recapData[0][1] = `${lineCount}`;
  
    const dataUri = pdf.output('datauristring');
    const newWindow = window.open();
    newWindow.document.write('<iframe width="100%" height="100%" src="' + dataUri + '"></iframe>');
};
