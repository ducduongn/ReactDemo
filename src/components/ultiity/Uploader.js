import {  useState } from 'react'

const Uploader = ({onFileUpload}) => {

    const [selectedFiles, setSelectedFiles] = useState(null)


    const onChange = (e) => {
        e.preventDefault()

        setSelectedFiles(e.target.files)
    }

    const onClick = (e) => {
        e.preventDefault()

        onFileUpload(selectedFiles)
    }

    return (
        <div className='uploader'>
            <input type="file" onChange={onChange} />
            <button  onClick={onClick}>Upload</button>
        </div>
    )
}

export default Uploader
