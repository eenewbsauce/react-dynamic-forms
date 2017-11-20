import React, { Component } from 'react';
import './App.css';
import DynamicForm from './dynamic-form';

class App extends Component {
    constructor(props) {
      super(props);
      let config = [
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
                                          required: true,
                                          options: [1, 2, 3, 4],
                                          placeholder: 'month',
                                          name: 'month'
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
                                          required: true,
                                          options: [1, 2, 3, 4, 5, 6],
                                          placeholder: 'day',
                                          name: 'day'
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
                                          required: true,
                                          options: [2001, 2002, 2003],
                                          placeholder: 'year',
                                          name: 'year'
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
                                                          text: 'next',
                                                          fn: 'next'
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
          },
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
                                                    text: 'Do you have any more income?'
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
                        type: 'form',
                        props: {
                            name: 'moreIncome'
                        },
                        children: [
                            {
                                type: 'radio',
                                props: {
                                    value: false,
                                    label: 'No',
                                    name: 'moreIncome'
                                }
                            },
                            {
                                type: 'radio',
                                props: {
                                    value: true,
                                    label: 'Yes',
                                    name: 'moreIncome'
                                }
                            }
                        ]
                    },
                    {
                        className: 'question-wizard__btn-wrapper',
                        type: 'div',
                        children: [
                            {
                                className: 'col-md-6',
                                type: 'div',
                                children: [
                                    {
                                        className: 'question-wizard__back-btn',
                                        type: 'button',
                                        props: {
                                            text: 'back',
                                            fn: 'previous'
                                        }
                                    },

                                ]
                            },
                            {
                                className: 'col-md-6',
                                type: 'div',
                                children: [
                                    {
                                        className: 'question-wizard__submit-btn',
                                        type: 'submit',
                                        props: {
                                            text: 'submit'
                                        }
                                    },

                                ]
                            }
                        ]
                    }
                ]
          }
      ];

      let activeIndex = 0;

      this.state = {
          activeIndex,
          config
      };
    }

    next(e) {
      e.preventDefault();
      this.setState({
          activeIndex: this.state.activeIndex+1
      });
    }

    previous(e) {
        e.preventDefault();
        this.setState({
            activeIndex: this.state.activeIndex-1
        });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Development Heaven</h1>
        </header>

        <DynamicForm
            config={ this.state.config[this.state.activeIndex] }
            next={(e) => this.next(e)}
            previous={(e) => this.previous(e)}
        />
      </div>
    );
  }
}

export default App;
