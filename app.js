const noop = () => {}
const runFFMPEGWorker = (opts, outcb = noop) =>
	new Promise((res, rej) => {
		const worker = new Worker('./lib/ffmpeg-worker-mp4.js', { name: 'FFmpeg worker' })
		let stdout = ''
		let stderr = ''
		const ret = {}
		worker.onmessage = ({ data: msg }) => {
			switch (msg.type) {
				case 'ready':
					worker.postMessage(Object.assign({}, opts, { type: 'run' }))
					break
				case 'stdout':
					outcb({ stdout: msg.data + '\n' })
					stdout += msg.data + '\n'
					break
				case 'stderr':
					outcb({ stderr: msg.data + '\n' })
					stderr += msg.data + '\n'
					break
				case 'exit':
					Object.assign(ret, { code: msg.data, stdout, stderr })
					break
				case 'done':
					ret.result = msg.data
					if (ret.code === 0) {
						res(ret)
					} else {
						rej(ret)
					}
					worker.terminate()
					break
			}
		}
	})
// const runFFMPEG = (opts, outcb = noop) =>
// 	new Promise((res, rej) => {
// 		let stdout = ''
// 		let stderr = ''
// 		let ret = { result: null }
// 		opts = Object.assign({}, opts, {
// 			print: data => {
// 				outcb({ stdout: data + '\n' })
// 				stdout += data + '\n'
// 			},
// 			printErr: data => {
// 				outcb({ stdout: data + '\n' })
// 				stderr += data + '\n'
// 			},
// 			onExit: code => {
// 				Object.assign(ret, { code, stdout, stderr })
// 				if (code === 0) {
// 					res(ret)
// 				} else {
// 					rej(ret)
// 				}
// 			}
// 		})
// 		ret.result = ffmpeg(opts)
// 	})
const readFile = file =>
	new Promise((res, rej) => {
		const reader = new FileReader()
		reader.onload = e => res(e.target.result)
		reader.onerror = rej
		reader.readAsArrayBuffer(file)
	})
const download = (url, name = 'file') => {
	const a = document.createElement('a')
	a.href = url
	a.download = name
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

const $ = s => document.querySelector(s)
const $video = $('.video')
$video.addEventListener('drop', e => {
	e.preventDefault()
	$('#video').files = e.dataTransfer.files
})
$video.addEventListener('dragover', e => {
	e.preventDefault()
})
const $audio = $('.audio')
$audio.addEventListener('drop', e => {
	e.preventDefault()
	$('#audio').files = e.dataTransfer.files
})
$audio.addEventListener('dragover', e => {
	e.preventDefault()
})
const renderoutput = ({ stdout, stderr }) => {
	if (stdout) {
		$('#stdout').textContent += stdout
	}
	if (stderr) {
		$('#stderr').textContent += stderr
	}
}
const $form = $('.form')
$form.addEventListener('submit', async e => {
	e.preventDefault()
	const video = $('#video').files[0]
	const audio = $('#audio').files[0]
	if (!video || !audio) {
		alert('Either video or audio does not exist.')
		return
	}
	const MEMFS = [
		{ name: 'video.mp4', data: await readFile(video) },
		{ name: 'audio.mp4', data: await readFile(audio) }
	]
	try {
		const x = await runFFMPEGWorker(
			{
				MEMFS,
				arguments: ['-nostdin', '-i', 'video.mp4', '-i', 'audio.mp4', '-c', 'copy', 'output.mp4']
			},
			renderoutput
		)
		const { result } = x
		const { data } = result.MEMFS[0]
		download(URL.createObjectURL(new Blob([data], { type: 'video/mp4' })), $('.form>input[name=filename]').value)
		//renderoutput(x)
	} catch (e) {
		//renderoutput(e)
	}
})
runFFMPEGWorker({ arguments: ['-version'] }).then(renderoutput)
