/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataDisplayProps {
    data: any; // Adjust this type based on your actual data structure
    title: string;
}

const DataDisplayCF: React.FC<DataDisplayProps> = ({ data, title }) => {
    if (!data) return null;

    return (
        <div className="data">
            <h2 className="data--title">{title}</h2>
            {data && <h3 className="data--elements">Contest Ranking: {data['ranking']}</h3>}
            {data && <h3 className="data--elements">Current Rating: {data['user-rank']}</h3>}
            {data && <h3 className="data--elements">Max Rank: {data['max-rank']}</h3>}
        </div>
    );
};

export default DataDisplayCF;
