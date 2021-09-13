import { Controller } from "@hotwired/stimulus"
import { TemplateInstance } from "https://cdn.skypack.dev/@github/template-parts"

export default class extends Controller {
  static get targets() { return [ "fieldset", "template" ] }
  static get values() { return { placeholder: String } }

  insert({ currentTarget }) {
    const id = (new Date()).getTime().toString()
    const template = new TemplateInstance(this.templateTarget, { [this.placeholderValue]: id })

    currentTarget.before(template)
  }

  hide({ target }) {
    const fieldset = this.fieldsetTargets.find(fieldset => fieldset.contains(target))

    if (fieldset) {
      fieldset.hidden = true
      fieldset.disabled = true
    }
  }
}
