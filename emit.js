const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter.on('Listener', () => {
    console.log('listener has been called')
})

emitter.emit('Listener')


emitter.on('FirstEvent', () => {
    console.log('First Event Triggered')
    emitter.emit('SecondEvent')
})

emitter.on('SecondEvent', () => {
    console.log('SecondEvent Triggered')
    emitter.emit('ThirdEvent')
})

emitter.on('ThirdEvent', () => {
    console.log('Third Event Triggered')
   
})

emitter.emit('FirstEvent')