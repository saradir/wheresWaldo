function LeaderboardTable({scores, currentScore}){
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
                    <tr key={score.id} className={score.id === currentScore?.id? "current-score" : ""}>
                        <td className="rank">{i + 1}</td>
                        <td className="name">{score.playerName}</td>
                        <td className="time">{score.time}</td>
                    </tr>                    
                ))}

                {/* display gap rows if rank is below 10 */}
                {currentScore.rank > 11 && (
                    <>
                        <tr className="leaderboard-gap">
                        <td colSpan="3">⋯</td>
                        </tr>

                        <tr className="current-score">
                        <td className="rank">{currentScore.rank}</td>
                        <td>{currentScore.playerName}</td>
                        <td className="time">{currentScore.time}</td>
                        </tr>
                    </>
                )}             
            </tbody>
        </table>
    );
}

export default LeaderboardTable;