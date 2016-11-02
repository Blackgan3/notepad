/**
 * Created by Administrator on 2016/10/12.
 */
//这个是整个的最底部的内容部分

//底部组件的部分

(function(){
    var Footer = React.createClass({
        render:function(){
            var clearButton=null;
            //如果当前有没有完成的条目就显示出来
            if(this.props.completedCount>0){
                clearButton = (
                    <button
                        className="clear-completed"
                        onClick = {this.props.clearCompleted}
                        >
                        Clear completed
                    </button>
                );
            }

            return(
                <div className="footer">
                    <span className="todo-count">{this.props.activeCount} items</span>
                    <ul className="filters">
                        <li><a href="#/" onClick={this.props.selectAllItems}>all</a></li>
                        <li><a href="#/active" onClick={this.props.selectActive}>active</a></li>
                        <li><a href="#/completed" onClick={this.props.selectCompleted}>completed</a></li>
                    </ul>
                    {clearButton}
                </div>

            );
        }
    });
    window.Footer = Footer;
})();
