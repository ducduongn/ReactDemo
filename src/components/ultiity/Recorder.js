import { ReactMic } from 'react-mic';


const Recorder = ({record, onStop, onData, startRecording, stopRecording}) => {
    return (
        <div>
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onTouchTap={startRecording} type="button">Start</button>
        <button onTouchTap={stopRecording} type="button">Stop</button>
      </div>
    )
}

export default Recorder
