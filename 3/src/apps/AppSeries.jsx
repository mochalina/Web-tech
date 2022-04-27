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
            </div>
        );
    }
}

function Nav(props){
    return (
        <a 
            class="btn btn-outline-light" 
            href="feedback.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Напишите отзыв о работе нашего сервиса"
            >
            Напишите отзыв о работе нашего сервиса
        </a>);
}

function Header(props){
    return(
        <div className="container sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-dark text-white rounded">
                        <div align="center"><h1 className="user-select-none">Популярные российские сериалы по мнению Алины Мочалиной</h1>
                            
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
            cR: 5,
            sR: 0,
            eR: 5,
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
            fR: 'data/dataSeries.xml'
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
            fR: 'data/dataSeries.xml'
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
        if(eR>pR){
            alert("Конец");
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
            fR: 'data/dataSeries.xml'
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
            fR: 'data/dataSeries.xml'
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
                            <Cdata key={item.id} id={item.id} picture={item.picture} title={item.title} rate={item.rate}  value={item.value}/>
                        ))}
                        </div>
                        <div className="row align-items-center" id="buttons">
                            <div className="col-sm-6">
                            <Button handleClick={this.handleClick}/></div>
                            <div className="col-sm-6">
                            <Nav/><p/>
                            <p className="text-white user-select-none">© Мочалина Алина</p>
                            <a class="btn text-white" href="https://www.instagram.com/moch_alina19">
                            <img className="rounded" src="https://img.icons8.com/color/344/instagram-new--v1.png" width="40" height="40" alt="..."/><nobr className="text-white user-select-none">Instagram:</nobr> <strong className="text-white user-select-none">moch_alina19</strong></a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        
    }
}

function Button(props){
    return(
        <button
            
            type="button"
            className="btn btn-dark"
            onClick={props.handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Загрузить еще 5 сериалов">
            <span className="visually-hidden">Загрузка...</span>
            Загрузить еще 5 сериалов
        </button>
    );
}


function Cdata(props){
    return (
        <div className="container-sm">
            <div class="row align-items-start">
                <Cid id={props.id}/>
                <Ctitle title={props.title}/>
                <Crate rate={props.rate}/>
                <div class="row align-items-center">
                <Cpicture picture={props.picture}/>
                <Cvalue value={props.value}/>
                </div>
                <hr className="bg-white" />
            </div>
        </div>
    );
}

function Cid(props){
    return <div className="col-sm-1"> <h1  className="text-center text-white bg-dark rounded-circle border-white">{props.id} </h1></div>;
}

function Ctitle(props){
    return <div className="col-sm-3"> <h2 className="text-white user-select-none">{props.title}</h2></div>;
}

function Cpicture(props){
    return <div className="col-sm-3"> <img className="rounded" src={`${props.picture}`} width="200" height="300" alt="..."/></div>;
}
function Crate(props){
  return <div className="col-sm-2"> <b className="text-white user-select-none">Рейтинг Кинопоиска:</b><p className="text-white user-select-none">{props.rate}</p></div>;
}
function Cvalue(props){
    return <div className="col-sm-9"> <b className="text-white user-select-none">Описание:</b><p className="text-white user-select-none">{props.value}</p></div>;
}
