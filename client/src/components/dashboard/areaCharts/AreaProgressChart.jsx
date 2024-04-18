const data = [
  {
    id: 1,
    name: "Lettres Recommandées",
    percentValues: 70,
  },
  {
    id: 2,
    name: "Paquets recommandés",
    percentValues: 40,
  },
  {
    id: 3,
    name: "Valeurs Declarés",
    percentValues: 60,
  },
  
];

const AreaProgressChart = () => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Types de colis le plus fréquent</h4>
      </div>
      <div className="progress-bar-list">
        {data?.map((progressbar) => {
          return (
            <div className="progress-bar-item" key={progressbar.id}>
              <div className="bar-item-info">
                <p className="bar-item-info-name">{progressbar.name}</p>
                <p className="bar-item-info-value">
                  {progressbar.percentValues}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${progressbar.percentValues}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaProgressChart;
