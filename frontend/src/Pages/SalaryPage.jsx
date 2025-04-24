const SalaryPage = () => {
  const salaryData = {
    totalSalary: 50000,
    month: "April 2025",
    basic: 30000,
    hra: 10000,
    bonus: 5000,
    deductions: 2000,
    netPay: 43000,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">Salary Summary - {salaryData.month}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SalaryItem label="Basic Salary" value={`$${salaryData.basic}`} />
          <SalaryItem label="House Rent Allowance (HRA)" value={`$${salaryData.hra}`} />
          <SalaryItem label="Bonus" value={`$${salaryData.bonus}`} />
          <SalaryItem label="Deductions" value={`-$${salaryData.deductions}`} />
        </div>

        <hr className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xl font-bold">
          <span>Total Payable:</span>
          <span className="text-green-600">${salaryData.netPay}</span>
        </div>
      </div>
</div>
  );
};

const SalaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center bg-gray-50 p-4 rounded border">
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default SalaryPage;
