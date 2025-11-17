
function History_card(){
	return(
		<>
		<div style={{width: '100%', height: '100%', background: 'white', boxShadow: '0px 4px 3px rgba(0, 0, 0, 0.25)', borderRadius: 8}}>  
		<div className="p-4 m-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex-shrink-0">
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-800">{"Vittal Kamat Restaurant"}</h2>
          <p className="text-sm text-gray-600 mb-1">{"Mihan, Nagpur"}</p>
        </div>
      </div>

      <hr className="border-gray-200 my-4" />

      <p className="text-gray-700 text-base mb-4">{"5 x Deluxe Thali"}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm">
            Order placed on {"28 May"}, {"7:21PM"}
          </p>
          <p className="text-gray-800 text-base font-medium">{"Delivered"}</p>
        </div>
        <p className="text-xl font-semibold text-gray-900">₹{"1165.84"}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-gray-800 font-medium mr-1">You rated 3</p>
          <div className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          aria-label="Order again"
        >
          Order again
        </button>
      </div>
    </div>

		</div>
		</>
	)
}

export default History_card
