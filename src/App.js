import React, {useState, useEffect}  from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/basic/Header'
import Tasks from './components/task/Tasks'
import AddTask from './components/task/AddTask'
import Footer from './components/basic/Footer'
import About from './components/basic/About'
import Gallery from './components/gallery/Gallery'
import LoadMore from './components/ultiity/LoadMore'

import Recorder from './components/ultiity/Recorder'

import axios from 'axios'
import Uploader from './components/ultiity/Uploader'

const App = () => {

  const [record, setRecord] = useState(false)

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [gallery, setGallery] = useState([])
  const [globalSearchValue, setglobalSearchValue] = useState('')
  const [pagenum, setPageNum] = useState(1)

  const API_KEY = '563492ad6f9170000100000157cd64981c4a49f19968cd2bd6f49291'

  useEffect(() => {
    const getTasks = async () => {

      const tasksFromServer = await fetchTasks()
      // console.log(tasksFromServer)
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Record
  const startRecording  = async() => {
    setRecord(true)
  }

  const stopRecording  = async() => {
    setRecord(false)
  }

  const onData = async(recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = async(recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
  }

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  //Delete task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}` , {
      method: 'DELETE'
    })
    
    setTasks(tasks.filter((task) => task.id !== id))
  }
    
  //Toggle reminder
  const toggleReminder = async(id) => {

    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, 
    reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id
    ? {...task, reminder: data.reminder} : task))
  }

  //Set show add task
  const showAddTaskBtn = () => setShowAddTask(!showAddTask)

  //Search
  const search = async(input) => {

    setglobalSearchValue(input.label)

    setPageNum(1)

    setGallery([])

    const items = await fetchItemsBySearch(input.label)
    
    setGallery(items)
  }

  const searchFromFile = async(input) => {

    setglobalSearchValue(input)

    setPageNum(1)

    setGallery([])

    const items = await fetchItemsBySearch(input)
    
    setGallery(items)
  }

  const searchMore = async() => {
      setPageNum(pagenum + 1)
      const items = await fetchMoreItemsBySearch(pagenum)
      setGallery([...gallery, ...items])
  }

  //Get images
  const fetchImages = async (baseURL) => {
    const res = await fetch(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: API_KEY
      }
    })
    const data = await res.json()
    
    return data.photos
  }

  //Fetch items
  const fetchItems = async () => {
    const index = 1
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=15`;
    const data = await fetchImages(baseURL);

    return data
}

  const fetchItemsBySearch= async(label) => {
    const BASEURL = `https://api.pexels.com/v1/search?query=${label}&page=1&per_page=15`
    const data = await fetchImages(BASEURL)
    console.log(data)
    return data
  }

  const fetchMoreItemsBySearch = async(index) => {
    // console.log(index)
    const BASEURL = `https://api.pexels.com/v1/search?query=${globalSearchValue}&page=${index}&per_page=15`
    const NBASEURL = `https://api.pexels.com/v1/search?query=${globalSearchValue}&page=2&per_page=15`
    const data = await fetchImages(NBASEURL)
    console.log(globalSearchValue)
    return data
  }

  const onFileUpload = async(selectedFiles) => {
    
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "file",
      selectedFiles[0]
    );
  
    // Request made to the backend api
    // Send formData object
    axios
      .post("http://127.0.0.1:8000/recognize", formData)
      .then(function(response) {
         console.log(response.data.class_name)
         searchFromFile(response.data.class_name)
      })
      .catch(function(error) {
        console.log(error);
        console.log('ERROR HERE')
      });

  };


  return (
    <Router>
      <div className='container'>
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        search={search} />
  
      <Route path='/tasks' exact render={(prop) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} 
        onDelete={deleteTask}
        onToggle = {toggleReminder}
        />
      ) : (
        "No Tasks to show"
      )}
        </>
      )}></Route>

      <Route path='/' exact render={(prop) => (
        <>
          {/* {
            <Recorder 
            record={record}
            onStop={onStop}
            startRecording={startRecording}
            startRecording={startRecording}/>
          } */}

          {<>
            <Uploader onFileUpload={onFileUpload} />
          </>}

          {gallery.length > 0 ? (
          <>
            <Gallery items={gallery}/>
            <LoadMore loadMore={searchMore}/>
          </>
        ) : (
        "Nothing to show"
        )}
    
        </>
      )}>

      </Route>
      {/* <Route path='/gallery' component={Gallery}></Route> */}
      <Route path='/about' component={About}></Route>
      <Footer/>
    </div>
    </Router>
  )
}


export default App;
