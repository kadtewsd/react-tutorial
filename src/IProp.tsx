// 外部ファイルで読みたいときは export 宣言
export interface IProp {
    name: string;
}

// default export することでインターフェースの名前をインポートできるようになるらしい
export default IProp;
