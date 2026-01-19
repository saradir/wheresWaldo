function LeaderboardTable({scores}){
    return (
        <table className="leaderboard">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th className="time">Time</th>
                </tr>
            </thead>
            <tbody>
                {scores?.map((score, i) => (
                    <tr key={score.id}>
                        <td className="rank">{i + 1}</td>
                        <td className="name">{score.playerName}</td>
                        <td className="time">{score.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LeaderboardTable;