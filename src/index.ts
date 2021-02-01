import MidiWriter from 'midi-writer-js'
import {mapped} from './mapping'

const track = new MidiWriter.Track()
// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}))

mapped.forEach(({marker, ...event}) => {
  if (marker) track.addMarker(marker)
  track.addEvent(new MidiWriter.NoteEvent(event))
})

const writer = new MidiWriter.Writer(track)
const uri = writer.dataUri()

document.getElementById('app')!.innerHTML = `
<h1>Welcome to SARS-CoV-2 vaccine to MIDI converter</h1>
<div>
  Download your MIDI
  <a href="${uri}">here</a>.
</div>
`
