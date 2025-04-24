const Dashboard = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold mb-8">Employee Management Dashboard</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-In / Check-Out */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Check-In / Check-Out</h3>
            <p className="text-4xl font-bold mb-4">09:41 AM</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Check In
            </button>
          </div>
  
          {/* Leave Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Leave Status</h3>
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mb-4">
              Pending
            </span>
            <br />
            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition">
              Apply for Leave
            </button>
          </div>
  
          {/* Profile Summary */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-300" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
  
          {/* Salary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <p className="text-3xl font-bold text-gray-800">$50,000</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  