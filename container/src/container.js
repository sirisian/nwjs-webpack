import fs from 'fs-extra';
import { registerFont, createCanvas } from 'canvas';

import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js' assert { type: "text" };
pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfjsWorker], { type: 'text/javascript' }));

// These use the resolve.modules trick to look in src so we don't have to use relative paths like ../ everywhere
import UIComponent from 'ui/uicomponent.js';

import 'fonts/fonts.css';
import 'css/style.css';

window.InitializeContainer = async function() {
	// Should be able to access window here
	window.win.title = 'Changed title';
	
	const $uiComponent = document.createElement('ui-component');
	$uiComponent.style.width = '100px';
	$uiComponent.style.height = '100px';
	// Should be able to access document.body here
	document.body.appendChild($uiComponent);
	
	// Canvas example using the canvas.node to ensure that node-loader works
	registerFont('fonts/Roboto.woff', { family: 'Comic Sans' });
	const canvas = createCanvas(500, 500);
	const context = canvas.getContext('2d');
	context.font = '12px "Roboto"'
	context.fillText('Test', 250, 10);
	const out = fs.createWriteStream(__dirname + '/test.png');
	const stream = canvas.createPNGStream();
	stream.pipe(out);
	// Naive, no error handling
	await new Promise(resolve => out.on('finish', resolve));
	console.log('The PNG file was created.');
	
	// pdf example just to ensure the webpack correctly read the worker as a string into the bundle
	const pdfDoc = await pdfjsLib.getDocument({ url: 'pdf/test.pdf', disableRange: true }).promise;
	console.log(pdfDoc);
};