import Header from '../Components/Header';

let xhr = new XMLHttpRequest();

function ajaxTestHandler(){
    if(xhr.readyState === 4 && xhr.status === 200){
        let resObj = JSON.parse(xhr.responseText);

        console.log(resObj);
    }
}

function testHandler(){
  xhr.onload = ajaxTestHandler;
  
  xhr.open('GET', '/boogimon/stampbook/stampbook.jsp?stampbookId=0', true);
  xhr.send();
  // let param = 'command=join&userId=' + userId + '&passwd=' + passwd + '&nickname=' + nickname;
  // xhr.open('POST', '/boogimon/user.jsp', true);
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.send(param);
}


const My = () => {
  return (
    <div>
      <Header />
      <button onClick={testHandler}>테스트</button>
    </div>
  );
};

export default My;
