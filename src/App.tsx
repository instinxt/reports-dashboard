
import './App.css'
import { ComponentBody } from './pages/ComponentBody'
import { Sidebar } from './pages/Sidebar'
import { Modal } from './components/Modal';
import './styles/modal.css';
import { useEffect, useState } from 'react';

function App() {

	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		setShowModal(true); // Show modal on page load
	}, []);

	const closeModal = () => {
		setShowModal(false);
	};
	return (

		<>
			<div id='app' className='flex'>
				<Modal open={showModal} onClose={closeModal}>
					<div className='p-[10px] w-[60%] flex justify-center'>
						Please Select Start Date before 1 Feb 2021, only Limited data is available for demo purpose
					</div>
				</Modal>

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
