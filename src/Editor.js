import React, { Component, Fragment } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            Isdeleting: false
        };
        this.myRef = React.createRef();
    }


    Snipet = (Input, cursor) => {
        var charlist = {
            '(': ')',
            '"': '"',
        }
        var snipchar = charlist[Input[cursor - 1]];
        if (snipchar !== undefined && this.state.Isdeleting === false) {
            // add char at cursor
            this.setState({ userInput: Input.slice(0, cursor) + snipchar + Input.slice(cursor) }, () => {
                this.myRef.current.focus();
                this.myRef.current.selectionStart = cursor;
                this.myRef.current.selectionEnd = cursor;
            });
        }


    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        
        // console.log(suggestions);




        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase().slice(-1)) > -1
        );
        console.log(userInput.toLowerCase().slice(-5));
        console.log(filteredSuggestions);
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        this.Snipet(userInput, this.myRef.current.selectionStart);

    };
    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: this.state.userInput+ e.currentTarget.innerText
        });
    };
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;
        this.setState({ Isdeleting: false })

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
        if (e.keyCode === 8) {
            this.setState({ Isdeleting: true })
        }
        if (e.keyCode === 9) {
            e.preventDefault()
            this.setState({ userInput: this.state.userInput + "\t" })
        }
    };
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                );
            }
        }
        return (
            <Fragment>

                <textarea className="editor"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder="Type something..."
                    ref={this.myRef}
                    spellcheck="false" 

                ></textarea>    <SyntaxHighlighter language="javascript">
document.getElementById("demo").innerHTML = "Hello World";
                    </SyntaxHighlighter>

                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Editor;
