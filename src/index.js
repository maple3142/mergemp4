const { createWorker } = require('@ffmpeg/ffmpeg')

const readFile = async file =>
	new Uint8Array(await new Response(file).arrayBuffer())

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

const worker = createWorker()
worker.load()
const ext = name => name.split('.').pop()
const $form = $('.form')
$form.addEventListener('submit', async e => {
	e.preventDefault()
	const video = $('#video').files[0]
	const audio = $('#audio').files[0]
	if (!video || !audio) {
		alert('Either video or audio does not exist.')
		return
	}
	const vidname = 'video.' + ext(video.name.split('.').pop())
	const audname = 'audio.' + ext(audio.name.split('.').pop())
	const outext = ext(video.name)
	await worker.write(vidname, await readFile(video))
	await worker.write(audname, await readFile(audio))
	await worker.run(
		`-i /data/${vidname} -i /data/${audname} -c copy output.${outext}`,
		{
			input: [vidname, audname],
			output: 'output.' + outext
		}
	)
	const { data } = await worker.read('output.' + outext)
	const url = URL.createObjectURL(new Blob([data]))
	download(url, $('.form>input[name=filename]').value)
})
