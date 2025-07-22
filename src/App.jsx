import { useState } from 'react'

function App() {

  let [city, setCity] = useState('')
  let [weatherDetails, setweatherDetails] = useState()
  let [isLoading, setIsloading] = useState(false)

  let getData = async (e) => {
    setIsloading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac5c7eeb26a63fca07a8a62e2909bea9&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    if (data.cod == "404") {
      setweatherDetails(undefined)
    }
    else {
      setweatherDetails(data)
    }
    setIsloading(false)

    setCity('')
    e.preventDefault();
  }

  return (
    <>
      <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>

          <form action="#" onSubmit={getData}>
            <input type="text" className='w-[300px] h-[40px] pl-3' placeholder='City Name' value={city} onChange={(e) => { setCity(e.target.value) }} />
            <button className='bg-[#2A609A] h-[40px] px-[10px]'>Search</button>
          </form>

          <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjlzb3UxaWlqandqd3d5ZzU2anRveGRxOGQxY3VjeTl1eWQyZm1hdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif" alt=""
              width={100} className={`absolute left-[40%] ${isLoading ? '' : 'hidden'} `} />

            {
              weatherDetails !== undefined
                ?
                <>
                  <h3 className='text-[30px] font-bold'>{weatherDetails.name} <span className='bg-[yellow]'>{weatherDetails.sys.country}</span></h3>
                  <h2 className='text-[40px] font-bold'>{weatherDetails.main.temp}</h2>
                  <img src={`https://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`} alt="" />
                  <p>{weatherDetails.weather[0].description}</p>
                </>
                :
                "No Data Found"
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default App
