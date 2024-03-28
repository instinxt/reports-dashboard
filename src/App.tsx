
import './App.css'
import { ComponentBody } from './components/ComponentBody'
import { Sidebar } from './components/Sidebar'

function App() {
	return (
		<>
			<div id='app' className='flex'>
				<div className='flex-none'>
					<Sidebar />
				</div>
				<div className='flex-1'>
					<ComponentBody />
				</div>
			</div>
		</>
	)
}

export default App
