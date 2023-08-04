// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onClickTabItem, isActive} = props
  const {language, id} = eachLanguage

  const tabIsActiveClass = isActive ? 'tab-active' : ''

  const onClickTab = () => {
    onClickTabItem(id)
  }

  return (
    <li className="each-language-item">
      <button
        className={`language-button ${tabIsActiveClass}`}
        type="button"
        onClick={onClickTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
