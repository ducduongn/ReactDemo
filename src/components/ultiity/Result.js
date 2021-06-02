import React from 'react'

const Result = ({class_name}) => {
    return (
        <div className="result">
            <h3> Result </h3>
            <table>
                <tr>
                    <th>Class name</th>
                </tr>
                <tr>
                    <td>{class_name}</td>
                </tr>
            </table>
        </div>
    )
}

export default Result
