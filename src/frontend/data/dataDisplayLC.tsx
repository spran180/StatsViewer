/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataDisplayProps {
    data: any; // Adjust this type based on your actual data structure
    title: string;
}

const DataDisplayCF: React.FC<DataDisplayProps> = ({ data, title }) => {
    if (!data) return null;
    console.log(data);
    return (
        <div className="data">
            <h2 className="data--title">{title}</h2>
            {{data} && <h3 className="data--elements">rank: {data.ranking}</h3>}
            {{data} && <h3 className="data--elements">Solved: {data.totalSolved}/{data.totalQuestions}</h3>}
            {{data} && <h3 className="data--elements">Easy: {data.easySolved}/{data.totalEasy}</h3>}
            {{data} && <h3 className="data--elements">Med.: {data.mediumSolved}/{data.totalMedium}</h3>}
            {{data} && <h3 className="data--elements">Hard: {data.hardSolved}/{data.totalHard}</h3>}
            
        </div>
    );
};

export default DataDisplayCF;
