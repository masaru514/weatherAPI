// only use into map
function parseHourWeatherInfo(hour, detail, index) {
  if(detail) return <div key={index} className="mb-1">{hour}: {detail[hour].description} {detail[hour].temp}</div>
  else return <div key={index} className="mb-1 text-gray-700 text-opacity-50">{hour}: <span className="placeholder-red-300">データがありません</span></div>
}

export default parseHourWeatherInfo