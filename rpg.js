// あなたは現代人（Player）、対戦相手は原始人（Gensijin）です。
// 図の青色がプロパティ、ピンク色がメソッドです。
// 攻撃メソッドは攻撃力の値だけ相手の体力を減らします。
// 現代人は30％の確率で回復メソッドを使用し体力を6回復します。
// 順番に行動して先に体力が尽きたほうが負けです。
//コンソールのみのゲーム

//「あなたのターン！」「原始人のターン」を交互に出力

//①現代人クラス、原始人クラスを作成
//②while文を使用しメインプログラムを作成→コンソールに出力

class Character {
  constructor(name, hp, power){
    this.name = name;
    this.hp = hp;
    this.power = power;
  }
}

//キャラクターのインスタンス化
let player = new Character('現代人',15, 2);
let monster = new Character('原始人',15, 3);
let count = 1;
const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );



//プレイヤーの攻撃
function playerAttack(){
  console.log("「" + player.name + "のターン！」");

  const rand = Math.floor(Math.random() * 100);
  if(rand < 20){
    console.log("ミス！相手に攻撃をかわされた！");
  }else if(rand < 80 && rand >= 20){
    console.log("プレイヤーの攻撃！！")
    monster.hp -= player.power;
    console.log(monster.name + "に" + player.power + "のダメージを与えた!");
  }else{
    console.log("会心の一撃！！！");
    monster.hp -= player.power*5;
    console.log(monster.name + "に" + player.power*5 + "のダメージを与えた!");
  }
  if(monster.hp < 0){
    monster.hp = 0;
  }
  console.log("------------------------");
  playerHeal();
};

//モンスターの攻撃
function monsterAttack(){
  console.log("「" + monster.name + "のターン！」");
  player.hp -= monster.power;
  if(player.hp < 0){
    player.hp = 0;
  }
  console.log(player.name + "に" + monster.power + "のダメージを与えた!");
  console.log("------------------------");
};

//プレイヤーの回復
function playerHeal(){
  const rand = Math.floor(Math.random() * 100);
  if(rand <= 30){
    console.log("「現代人はホイミを発動!」")
    player.hp += 6;
    console.log(player.name + "は体力が" + 6 + "回復した!");  
    console.log(player.name + "のHP：" + player.hp);
    console.log("------------------------");
  }else{
    return;
  }
}

//ステータスを表示
function showStatus(){
  console.log("（現在のステータス）");
  console.log(player.name + "のHP：" + player.hp);
  console.log(monster.name + "のHP：" + monster.hp);
}

//バトル開始
//ユーザー入力を行う場合
// const yourName = prompt("あなたの名前はなんですか");
console.log("【バトル開始!】")
console.log("------------------------");
console.log("あなたは" + player.name + "です");
console.log("敵は" + monster.name + "です");
console.log("------------------------");

//体力が0になるまで闘い続ける。
async function main(){
  while(player.hp > 0 || monster.hp > 0){
    console.log("【" + count + "回目のセット】");
    await sleep(2000);
    playerAttack();
    await sleep(2000);
    if(monster.hp <= 0){
      console.log(monster.name + "を倒した！" + player.name + "の勝利!");
      break;
    }
    monsterAttack();
    await sleep(2000);
    if(player.hp <= 0){
      console.log("ぐふっ、、" + player.name + "は力尽きてしまった、、、")
      break;
    }
    showStatus();
    count++;
    console.log("------------------------");
    await sleep(2000);
  }
  //決着
  console.log(count + "回目のセットで決着がつきました")
}

main();


