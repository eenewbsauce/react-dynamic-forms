import React, { Component } from 'react';
import './App.css';
import DynamicForm from './dynamic-form';

class App extends Component {
  constructor(props) {
      super(props);
      this.config = [
          {
              className: 'question-wizard__form-wrapper',
              type: 'div',
              children: [
                  {
                      className: 'col-md-12',
                      type: 'div',
                      children: [
                          {
                              className: 'row',
                              type: 'div',
                              children: [
                                  {
                                      className: 'col-md-12',
                                      type: 'div',
                                      children: [
                                          {
                                              type: 'p',
                                              props: {
                                                  text: 'What was the start date?'
                                              }
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      className: 'question-wizard__form',
                      props: {
                          name: 'aiq-form'
                      },
                      type: 'form',
                      children: [
                          {
                              className: 'question-wizard__date-month-wrapper',
                              type: 'div',
                              children: [
                                  {
                                      className: 'question-wizard__months',
                                      type: 'select',
                                      props: {
                                          require: true,
                                          options: [1, 2, 3, 4],
                                          placeholder: 'month'
                                      }
                                  }
                              ]
                          },
                          {
                              className: 'question-wizard__date-day-wrapper',
                              type: 'div',
                              children: [
                                  {
                                      className: 'question-wizard__days',
                                      type: 'select',
                                      props: {
                                          require: true,
                                          options: [1, 2, 3, 4, 5, 6],
                                          placeholder: 'day'
                                      }
                                  }
                              ]
                          },
                          {
                              className: 'question-wizard__date-year-wrapper',
                              type: 'div',
                              children: [
                                  {
                                      className: 'question-wizard__years',
                                      type: 'select',
                                      props: {
                                          require: true,
                                          options: [2001, 2002, 2003],
                                          placeholder: 'year'
                                      }
                                  }
                              ]
                          },
                          {
                              className: 'row',
                              type: 'div',
                              children: [
                                  {
                                      className: 'col-md-12',
                                      type: 'div',
                                      children: [
                                          {
                                              className: 'question-wizard__btn-wrapper',
                                              type: 'div',
                                              children: [
                                                  {
                                                      className: 'question-wizard__submit-btn',
                                                      type: 'button',
                                                      props: {
                                                          text: 'next'
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }
      ];
  }

  click(e) {
      e.stopPropagation();
      alert('foo');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Development Heaven</h1>
        </header>

        <DynamicForm config={ this.config[0] } onClick={(e) => this.click(e)} />
      </div>
    );
  }
}

export default App;
