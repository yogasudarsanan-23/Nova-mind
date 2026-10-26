import {useState} from 'react';
import './App.css';

function App() {
    // Navigation State

    const [currentTab, setCurrentTab] = useState("home");

    // Sample state for analysis

    const[isAnalyzing, setlsAnalyzing] = useState(false);
    const[uploadFile, setUploadFile] = useState(null);

    // Simulated data for your dashboard and transactions

    const dashboardStats = { 
      totalCharges: "₹12,450.00",
      suspiciousFees: "₹450.00",
      potentialSavings: "2,100.00",
    };

    const sampleTransactions = [
      {id:1, date:'2026-10-20', description:'ATM Overage Fee', category:'Bank Fees', amount:'₹150.00', status:'Suspicious'},
      {id:2, date:'2026-10-18', description:'Minimum Balance Penalty', category:'Bank Fees', amount:'₹300.00', status:'Suspicious'},
      {id:3, date:'2026-10-15', description:'Local Grocery Store', category:'Shopping', amount:'₹2,450.00', status:'Normal'},
      {id:4, date:'2026-10-13', description:'Monthly SMS Alert Charge', category:'Service Charge', amount:'₹25.00', status:'Review Needed'}, 
    ];

    // Handler to simulate document scanning from Home or Upload Tab

    const handleTriggerScan= () => {
      setCurrentTab("Upload")
    };

    const handleFileUpload = (e) => {
      if(e.target.files[0]){
        setUploadFile(e.target.files[0]);
        setlsAnalyzing(true);
        setTimeout(() => {
          setlsAnalyzing(false);
          setCurrentTab('dashboard');
        },2000);
      }
    };

    return(
      <div className="app-layout">
        {/*Sidebar Navigation */}
        <aside className= "sidebar">
          <div className='sidebar-band'>
            <h2>NM FINTECH</h2>
          </div> {/*Sidebar brand */}
          <nav className="sidebar-menu">
            <button className={currentTab === 'home' ? 'active':''} onClick={() =>
               setCurrentTab('home')}>🏠Home</button>
              <button className={currentTab==='dashboard' ? 'active':''} onClick={() =>
                 setCurrentTab('dashboard')}>📊Dashboard</button>
              <button className={currentTab==='upload' ? 'active':''} onClick={() =>
                 setCurrentTab("upload")}>📁Upload Statement</button>
              <button className={currentTab === 'transactions' ? 'active':''} onClick={() =>
                 setCurrentTab('transactions')}>📑Transactions</button>
              <button className={currentTab === 'policies' ? 'active':''} onClick={() =>
                 setCurrentTab('policies')}>ℹ️Bank Policies</button>
              <button className={currentTab === 'settings' ? 'active':''} onClick={() =>
                 setCurrentTab('settings')}>⚙️Settings</button>
          </nav>
        </aside>

        {/*Main Content Render Window */}
        <main className='main-content'>

                  {/* 1. HOME TAB */}
                  {currentTab === 'home' && (
                    <div className='page-view animate-fade'>
                      <h1>NM Fintech Statement Analyzer</h1>
                      <p className='subtitle'>Uncover hidden bank fees,recurring subscriptions and fine-print deductions instantly.</p>
                      <div className='features-grid'>
                        <div className='feature-card'>
                          <h3>🔍Hidden Fee Detection</h3>
                          <p>We crawl line-by-line to find complex, stacked or mislabelled account maintenance penalties.</p>
                        </div>
                        <div className='feature-card'>
                          <h3>📈 Policy Matching</h3>
                          <p>Cross-references deductions directly against standard regulatory and institutional bank limits</p>
                        </div>
                      </div>
                      
                      <div className='cta-section'>
                        <button className='primary-btn' onClick={handleTriggerScan}>
                          Scan Your Bank Statement with NM Fintech
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. DASHBOARD TAB */}
                  {currentTab==='dashboard' && (
                    <div className='page-view'>
                      <h1>NM Fintech Insights Dashboard</h1>

                      <div className='stats-grid'>
                        <div className='stat-box'>
                          <span>Total Charges Tracked</span>
                          <h3>{dashboardStats.totalCharges}</h3>
                        </div>
                        <div className='stat-box warning'>
                          <span>Suspicious / Unfair fees</span>
                          <h3>{dashboardStats.suspiciousFees}</h3>
                        </div>
                      <div className='stat-box success'>
                        <span>Potential Monthly Savings</span>
                        <h3>{dashboardStats.potentialSavings}</h3>
                      </div>
                      </div>
                    </div>
                  )}

                  {/* 3. UPLOAD STATEMENT TAB */}
                  {currentTab === 'upload' && (
                    <div className='page-view'>
                      <h1>Upload Bank Statement</h1>
                      <p>Supports secure PDF, CSV or e-statement</p>

                      <div className='upload-dropzone'>
                        {isAnalyzing ? (
                          <div className='loader-status'>
                            <div className='spinner'></div>
                            <p>NM Fintech engine is analyzing transactions against systemic bank guidelines...</p>
                      </div>
                        ) : (
                          <>
                          <input type='file' id='statement-file' onChange={handleFileUpload} accept= "pdf.csv" />
                          <label htmlFor='statement-file' className='upload-label'>
                            <span>{uploadedFile ? 'Selected: ${uploadedFile.name}' : "Drag & drop or click to choose file"}</span>
                          </label>
                          </>
                        )}
                    </div>
                    </div>
                  )}

                  {/*4. TRANSACTIONS TAB */}
                  {currentTab === 'transactions' && (
                    <div className='page-view'>
                      <h1>Statement Itemization </h1>
                      <p>Review individual outlays flagged by NM Fintech for abnormal deductions.</p>

                      <table className='data-table'>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleTransactions.map((tx) => (
                            <tr key={tx.id} className={tx.status === 'Suspicious' ? 'row-alert': ""}>
                              <td>{tx.date}</td>
                              <td>{tx.description}</td>
                              <td>{tx.category}</td>
                              <td>{tx.amount}</td>
                              <td>
                                <span className={'badge ${tx.status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}'}>
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 5.BANK POLICIES TAB */}
                  {currentTab ==='policies' && (
                    <div className='page-view'>
                      <h1>Regulatory & Bank Fee Guide</h1>
                      <p>Compare standard institutional bounds to prevent operational penalities.</p>
                    <div className='policy-accordion'>
                      <div className='policy-item'>
                        <h4>Minimum Balance Criteria</h4>
                        <p>Most basix tiers require an Average Monthly Balance(AMB) baseline. Falling short triggers a tier-based penalty ranging from ₹100 to ₹600.</p>
                      </div>
                      <div className='policy-item'>
                        <h4>ATM Usage Limits</h4>
                        <p>Financial caps restrict free transactions to 3 or 5 runs monthly depending on regional metropolitan lines, costing roughly ₹21+taxes thereafter.</p>
                      </div>
                    </div>
                    </div>
                  )}

                  {/*6. SETTINGS TAB */}
                  {currentTab ==='settings' && (
                    <div className='page-view'>
                      <h1>NM Fintech Preference Controls</h1>
                      <div className='settings-form'>
                        <div className='setting-row'>
                          <label>Data Privacy Mode</label>
                          <input type='checkbox' defaultChecked />
                          <span className='hint'>Redact sensitive account numbers during text-processing parsing locally.</span>
                        </div>
                        <div className='setting-row'>
                          <label>Primary Alert Threshold</label>
                          <select defaultValue= "100">
                            <option value="50">Flag items above ₹50</option>
                            <option value="100">Flag items above ₹100</option>
                            <option className="500">Flag items above ₹500</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
        </main>
      </div>
    );
}
export default App;