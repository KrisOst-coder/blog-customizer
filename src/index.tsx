import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import 'src/styles/index.scss';
import {App} from './components/app/App'

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
