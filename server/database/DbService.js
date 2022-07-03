const mysql = require("mysql");


const connection = () => {

}

export class DbService {

    instance; // 数据库连接实例

    constructor() { }
    // 实例化数据库连接
    initMysql() {
        this.instance = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "lucky520.com",
            database: "article"
        });
        return this.instance;
    }

    static getConnection() {
        return this.instance ? this.instance : this.initMysql();
    }


    /**
     * 保存文章内容
     *
     * @param {*} article
     * @return {*} 
     * @memberof DbService
     */
    async saveArticle(article) {
        let connection = await DbService.getConnection();
        let sql = "INSERT INTO article (title, content, author, create_time) VALUES (?, ?, ?, ?)";
        let params = [article.title, article.content, article.author, article.create_time];
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


}
