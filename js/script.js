document.addEventListener("DOMContentLoaded", mystart);

function mystart(){

    let synth = window.speechSynthesis;

    let inputForm = document.querySelector('form');
    let inputTxt = document.querySelector('txt');
    let voiceSelect = document.querySelector('select');

    let pitch = document.querySelector('#pitch');
    let pitchValue = document.querySelector('.pitch-value');
    let rate = document.querySelector('#rate');
    let rateValue = document.querySelector('.rate-value');

    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices();
        let selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
        voiceSelect.innerHTML = '';
        for(i = 0; i < voices.length ; i++) {
            let option = document.createElement('option');
            option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

            if(voices[i].default) {
                option.textContent += ' -- DEFAULT';
            }

            option.setAttribute('data-lang', voices[i].lang);
            option.setAttribute('data-name', voices[i].name);
            voiceSelect.appendChild(option);
        }
        voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak(){
        if(inputTxt.value !== ''){
            let utterThis = new SpeechSynthesisUtterance(inputTxt.value);
            let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
            for(i = 0; i < voices.length ; i++) {
                if(voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                }
            }
            utterThis.pitch = pitch.value;
            utterThis.rate = rate.value;
            synth.speak(utterThis);
        }
    }

    inputForm.onsubmit = function(event) {
        event.preventDefault();

        speak();

        inputTxt.blur();
    };

    pitch.onchange = function() {
        pitchValue.textContent = pitch.value;
    };

    rate.onchange = function() {
        rateValue.textContent = rate.value;
    };

    voiceSelect.onchange = function(){
        speak();
    }
}