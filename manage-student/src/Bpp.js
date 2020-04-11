import React, { Component } from "react";
import ReactDOM from "react-dom";

class Items extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

    this.state = {
      categories: [
        {
          id: 1,
          name: "category 1",
          items: [
            { name: "item 1", id: Math.floor(Math.random() * 99999) },
            { name: "item 2", id: Math.floor(Math.random() * 99999) }
          ]
        },
        {
          id: 2,
          name: "category 2",
          items: [
            { name: "item 3", id: Math.floor(Math.random() * 99999) },
            { name: "item 4", id: Math.floor(Math.random() * 99999) }
          ]
        },
        {
          id: 3,
          name: "category 3",
          items: [{ name: "item 5", id: Math.floor(Math.random() * 99999) }]
        }
      ],
      checkedListAll: [],
      ItemsChecked: false
    };
  }

  selectedItems(e) {
    const { value, checked } = e.target;
    let { checkedListAll } = this.state;

    if (checked) {
      checkedListAll = [...checkedListAll, value];
    } else {
      checkedListAll = checkedListAll.filter(el => el !== value);
      if (this.state.ItemsChecked) {
        this.setState({
          ItemsChecked: !this.state.ItemsChecked
        });
      }
    }
    this.setState({ checkedListAll });
  }
  selectItem(e) {
    const { checked } = e.target;
    const { categories } = this.state;
    const collection = [];

    if (checked) {
      for (const cat of categories) {
        for (const item of cat.items) {
          collection.push(item.id);
        }
      }
    }

    this.setState({
      checkedListAll: collection,
      ItemsChecked: checked
    });
  }

  handleCheckboxClick(e) {
    //e.preventDefault();

    const { value, checked } = e.target;

    if (checked) {
      this.setState(prevState => ({
        checkedListAll: [...prevState.checkedListAll, value * 1]
      }));
    } else {
      this.setState(prevState => ({
        checkedListAll: prevState.checkedListAll.filter(item => item != value)
      }));
    }
  }

  render() {
    const { categories, checkedListAll, ItemsChecked } = this.state;

    return (
      <div>
        <header>
          <label>
            <input
              type="checkbox"
              checked={ItemsChecked}
              onClick={this.selectItem.bind(this)}
            />Select all
          </label>
        </header>
        {categories.map(cat => {
          return (
            <ItemCategory
              {...cat}
              key={cat.id}
              click={this.openModal}
              selectedItems={this.selectedItems.bind(this)}
              ItemsChecked={ItemsChecked}
              checkedListAll={checkedListAll}
              handleCheckboxClick={this.handleCheckboxClick}
            />
          );
        })}
        {<pre>All Selected: {JSON.stringify(ItemsChecked, null, 2)}</pre>}
        {<pre>Selected List: {JSON.stringify(checkedListAll, null, 2)}</pre>}
      </div>
    );
  }
}

class ItemCategory extends Component {
  render() {
    const {
      items,
      name,
      selectedItems,
      ItemsChecked,
      checkedListAll
    } = this.props;

    const getItems = items.map(item => {
      return item;
    });

    return (
      <div>
        <div>-{name}</div>
        <ul>
          {getItems.map(item => {
            return (
              <li key={item.id}>
                <Checkbox
                  item={item}
                  selectedItems={selectedItems}
                  isChecked={checkedListAll.includes(item.id)}
                  handleCheckboxClick={this.props.handleCheckboxClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Checkbox extends Component {
  render() {
    const { item, isChecked } = this.props;
    //const { isChecked } = this.state;

    return (
      <label>
        <input
          type="checkbox"
          value={item.id}
          checked={isChecked}
          onChange={this.props.handleCheckboxClick}
        />
        {item.name}
      </label>
    );
  }
}

function App() {
  return <Items />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
