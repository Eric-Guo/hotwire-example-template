import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() { return [ "editor", "listbox", "submit" ] }
  static get values() { return { wordPattern: String, breakPattern: String } }

  // Actions

  insert({ target: { value, innerHTML } }) {
    const editor = this.editorTarget.editor
    const selectedRange = this.findWordBoundsFromCursor(editor)

    editor.setSelectedRange(selectedRange)
    editor.deleteInDirection("backward")
    editor.insertAttachment(new Trix.Attachment({ sgid: value, content: innerHTML }))
  }

  expand({ target: { editor } }) {
    const mention = this.findMentionFromCursor(editor)

    if (mention) {
      this.toggle(true)
      this.submitTarget.value = mention
      this.submitTarget.click()
    } else {
      this.toggle(false)
    }
  }

  // Private

  findMentionFromCursor(editor) {
    const [ start, end ] = this.findWordBoundsFromCursor(editor)
    const word = editor.getDocument().toString().slice(start, end)
    const [ mention ] = word.match(new RegExp(this.wordPatternValue)) || []

    return mention
  }

  findWordBoundsFromCursor(editor) {
    const content = editor.getDocument().toString()
    const position = editor.getPosition()
    const breakPattern = new RegExp(this.breakPatternValue)

    return findWordBoundsFromStringAtPosition(content, position, (char) => breakPattern.test(char))
  }

  toggle(expanded) {
    if (expanded) {
      this.listboxTarget.hidden = false
      this.editorTarget.setAttribute("autocomplete", "username")
      this.editorTarget.setAttribute("autocorrect", "off")
    } else {
      this.listboxTarget.hidden = true
      this.editorTarget.removeAttribute("autocomplete")
      this.editorTarget.removeAttribute("autocorrect")
    }
  }
}

function findWordBoundsFromStringAtPosition(string, position, characterMatchesWordBoundary) {
  let start = position
  let index = position
  while(--index >= 0) {
    const char = string.charAt(index)
    if (characterMatchesWordBoundary(char)) break
    start = index
  }

  let end = position
    index = position
  while(index < string.length) {
    const char = string.charAt(index)
    if (characterMatchesWordBoundary(char)) break
    end = ++index
  }

  if (start != end) {
    return [ start, end ]
  } else {
    return [ -1, -1 ]
  }
}
