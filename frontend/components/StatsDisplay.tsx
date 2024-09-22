export function StatsDisplay() {
  // TODO: Implement fetching of actual stats
  const stats = {
    filesUploaded: 10,
    testsGenerated: 25,
    projectsCreated: 3,
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatBlock 
          label="Files Uploaded" 
          value={stats.filesUploaded} 
          icon={<FileIcon />}
        />
        <StatBlock 
          label="Tests Generated" 
          value={stats.testsGenerated} 
          icon={<TestIcon />}
        />
        <StatBlock 
          label="Projects Created" 
          value={stats.projectsCreated} 
          icon={<ProjectIcon />}
        />
      </div>
    </div>
  )
}

function StatBlock({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="border bg-white p-6 rounded-lg flex-1 h-36 flex items-center">
      <div className="text-blue-600 mr-6">{icon}</div>
      <div>
        <p className="text-blue-800 font-medium text-lg mb-2">{label}</p>
        <p className="text-3xl font-bold text-blue-600">{value}</p>
      </div>
    </div>
  )
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function TestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function ProjectIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}