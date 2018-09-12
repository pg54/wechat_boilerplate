// const rules= [
//     [/#{6}\s?([^\n]+)\n/g, '<h6>$1</h6>'],
//     [/#{5}\s?([^\n]+)\n/g, '<h5>$1</h5>'],
//     [/#{4}\s?([^\n]+)\n/g, '<h4>$1</h4>'],
//     [/#{3}\s?([^\n]+)\n/g, '<h3>$1</h3>'],
//     [/#{2}\s?([^\n]+)\n/g, '<h2>$1</h2>'],
//     [/#{1}\s?([^\n]+)\n/g, '<h1>$1</h1>'],
//     [/\*\*([^\*\n]+)\*\*/g, '<b>$1</b>'],
//     [/\*([^\*\n]+)\*/g, '<i>$1</i>'],
//     [/((\n\d\..+))/g, '<ol>$1</ol>'],
//     [/([^\n]+\n)/g, '<p>$1</p>'],
// ]
import Remarkable from 'remarkable'
export default {
    bind(el) {
        var text = el.textContent;
        // rules.forEach(([rule, template]) => {
        //      text =  text.replace(rule, template)
        // })
        var md = new Remarkable();
        el.innerHTML = md.render(text)
    }
}
