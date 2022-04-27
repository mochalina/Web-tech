class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        return(
            <div class="app" id="app">
                <Header/>
                <Content/>
                <Modal/>
            </div>
        );
    }
}

function Header(props){
    return(
        <div className="container sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-dark text-white rounded border-white">
                        <div align="center"><h1 className="user-select-none">Отзывы о работе сервиса</h1>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cR: 2,
            sR: 0,
            eR: 2,
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/dataFeedback.xml'
        };
        fetch("src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/dataFeedback.xml'
        };
        fetch("src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
        if(eR>pR){
            alert("Отзывы закончились");
        }
    }
    
    componentDidMount(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/dataFeedback.xml'
        };
        fetch("src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/dataFeedback.xml'
        };
        fetch("src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
        
            return(
                <div className="container">
                    <div class="p-3 mb-2 bg-black text-dark bg-gradient">
                        <div className="row align-items-center" id="content">
                        {items.map(item => (
                            <Cdata key={item.id} id={item.id} name={item.name} email={item.email} rate={item.rate} value={item.value}/>
                        ))}
                        </div>
                        <div className="row align-items-center" id="buttons">
                        <div className="col-sm-6">
                            <Button handleClick={this.handleClick}/></div>
                            <div className="col-sm-6">
                            <Nav/><p/>
                            <Form/><p/>
                            <p className="text-white user-select-none">© 2022 Мочалина Алина</p>
                            <a class="btn text-white" href="https://www.instagram.com/moch_alina19">
                            <img className="rounded" src="https://img.icons8.com/color/344/instagram-new--v1.png" width="40" height="40" alt="..."/><nobr className="text-white user-select-none">Instagram:</nobr> <strong className="text-white user-select-none">moch_alina19</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
    }
}


function Cdata(props){
    return (
        <div className="container-sm">
            <div class="row align-items-start">
                <Cid id={props.id}/>
                <Cname name={props.name}/>
                <Cemail email={props.email}/>
                <Crate rate={props.rate}/>
                <div class="row align-items-center">
                <Cvalue value={props.value}/></div>
                <hr className="bg-white" />
            </div>
        </div>
    );
}

function Cid(props){
    return (
        <div className="col-sm-1">
            <h1 className="text-center text-white bg-dark rounded-circle border-white">
            {`${props.id}  `}</h1></div>
            
    );
}

function Cname(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">Имя: <br /></h>
            <h className="text-white user-select-none">{props.name}</h>
        </div>
    );
}
function Crate(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">Оценка: <br /></h>
            <h className="text-white user-select-none">{props.rate}</h><img className="rounded" src="https://img.icons8.com/fluency/2x/star.png" width="20" height="20" alt="..."/>
        </div>
    );
}
function Cemail(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">
            Еmail:  <br /></h>
            <h className="text-white user-select-none">{` ${props.email}  `}</h>
        </div>
    );
}

function Cvalue(props){
    return (
        <div className="col-sm">
            <h3 className="text-white user-select-none">Отзыв:</h3>
            <p className="text-white user-select-none">{props.value}</p>
        </div>
    );
}

function Button(props){
    return(
        <button
            type="button"
            className="btn btn-dark"
            onClick={props.handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Загрузить еще 2 отзывов"
            >
            <span className="visually-hidden">Загрузка...</span>
            Загрузить еще 2 отзывов
        </button>
    );
}

function Nav(props){
    return (
        <a 
            class="btn btn-outline-light" 
            href="series.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Посмотреть список сериалов"
            >
            Посмотреть список сериалов
        </a>);
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };

    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true
        });
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
      
            return(
                <div>
                    <button 
                        type="button"
                        className="btn btn-outline-light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Написать отзыв"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal"
                        >
                        {`Написать отзыв  `}
                        
                    </button>
                    
                </div>
                
            );
        
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: '',
            email: '',
            rate: '',
            value: '',
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(){
        event.preventDefault();
        const {name, email, rate, value, pR} = this.state;
        let bN = false;let bE = false;let bV = false;
        if(!((name.trim().length==="0")||(name.trim()===""))){bN = true;}else{bN = false;}
        if(!((email.trim().length==="0")||(email.trim()===""))&&(email.includes('@'))){bE = true;}else{bE = false;}
        if(!((rate.trim().length==="0")||(rate.trim()===""))){bV = true;}else{bV = false;}
        if(!((value.trim().length==="0")||(value.trim()===""))){bV = true;}else{bV = false;}
        if(bN&&bE&&bV==true){
            let jD = {
                fR: 'data/dataFeedback.xml'
            };
            fetch("src/api/loadLength.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jD)
            })
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        pR: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            let jsonData = {
                id: pR,
                name: name,
                email: email,
                rate: rate,
                value: value,
                xml: 'data/dataFeedback.xml'
            };
            console.log(jsonData);
            fetch("src/api/addItemXml.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jsonData)
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            alert("Отзыв отправлен!");
        }else{
            alert("Отзыв не отправлен - проверьте правильность введёных данных!");
        }
    }

    componentDidMount(){
        const{isLoaded, pR} = this.state;
        let jD = {
            fR: 'data/dataFeedback.xml'
        };
        fetch("src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    render(){
        const{error, isLoaded, name, email, rate, value} = this.state;
        
            return(
                <div className="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header p-3 mb-2 bg-secondary text-white bg-gradient">
                                <h5 className="modal-title user-select-none" id="ModalLabel">Напишите комментарий и дайте оценку работе нашего сервиса</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form autocomplete="off" class="row g-3 needs-validation" onSubmit={this.handleClick}>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="text" 
                                            id="name"
                                            name="name"
                                            class="form-control" 
                                            placeholder="Иванов И.И."
                                            required
                                            value={name}
                                            pattern="[A-Za-z]{4,16}"
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="name">Введите имя</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="email" 
                                            id="email"
                                            name="email"
                                            class="form-control" 
                                            placeholder="name@example.com"
                                            pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                            value={email}
                                            required
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="email">Введите email</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="rate" 
                                            id="rate"
                                            name="rate"
                                            class="form-control" 
                                            placeholder="5"
                                            required
                                            value={rate}
                                            pattern="[0-10]{1,1}"
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="rate">Введите оценку от 0 до 10</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <textarea 
                                            class="form-control" 
                                            id="text"
                                            name="value"
                                            value={value}
                                            required
                                            aria-label="With textarea"
                                            placeholder="Комментарий"
                                            onChange={this.handleChange}
                                            >
                                        </textarea>
                                        <label for="text">Напишите комментарий</label>
                                    </div>
                                </form>
                            </div>
                            <div align="center" className="modal-start sticky7" id="buttons">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={this.handleClick}
                                    
                                    >
                                    Отправить комментарий
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
    }
}

