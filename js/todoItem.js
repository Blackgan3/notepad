/**
 * Created by 薛干 on 2016/10/8.
 * 这里是每一个todo条所在的地方
 */
(function(){
    'use strict';
    //每一件事情的组件
    var TodoItem = React.createClass({
        render:function(){
            return(
                <li className={classNames({
					completed: this.props.todo.completed
				})}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={this.props.todo.completed}
                            onChange={this.props.todoToToggle}
                            />
                        <label>{this.props.value}</label>
                        <button className="destroy" onClick={this.props.onDestroy} />
                    </div>
                </li>
            );
        }
    });
    window.TodoItem=TodoItem;
})();
