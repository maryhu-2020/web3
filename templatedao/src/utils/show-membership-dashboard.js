import {shortenAddress} from './helper.js'

const showMembershipDashboard = (memberList) => {    
    return (
        <div className="member-page">
            <h1>TemplateDAO Member Page</h1>
            <p>Congratulations on being a member</p>
            <div>
                <div>
                    <h2>Member List</h2>
                    <table className="card">
                        <thead>
                        <tr>
                            <th>Address</th>
                            <th>Token Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {memberList.map((member) => {
                            return (
                            <tr key={member.address}>
                                <td>{shortenAddress(member.address)}</td>
                                <td>{member.tokenAmount}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default showMembershipDashboard;