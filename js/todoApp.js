/**
 * Created by Administrator on 2016/10/8.
 * 这里是整个的todoApp的整个主体部分
 */
var app = app||{};
(function(){
    'use strict';
    var ENTER_KEY=13;
    var todos = window.localStorage['todos']?JSON.parse(window.localStorage['todos']):[];
    var mark = 'true';
    var todoShowing='all';

  //  var todoItem = app.TodoItem;
    //将todos保存到本地存储
    var save = function(){
        window.localStorage['todos'] = JSON.stringify(todos);
    };
    var TodoApp = React.createClass({
        getInitialState:function(){
            return ({
                newTodo:'',
                editing: null
            });
        },
        //当输入框中的内容进行改变的时候,改变state中newTodo的值
        handleChange:function(event){
            this.setState({newTodo:event.target.value});
        },
        //当在输入框中摁下回车键的时候,执行这个函数
        handleNewTodoKeyDown:function(event){
            if(event.keyCode!==ENTER_KEY){
                return;
            }
            //阻止默认事件
            event.preventDefault();
            //获取到当前输入框的值
            var val = this.state.newTodo.trim();
            //如果当前值不为空
            if(val){
                //在这里进行添加item
                todos.push({text:this.state.newTodo,id:new Date().getTime(),completed:false});
                save();
                this.setState({newTodo:''});
            }
        },
        todoStateToggle:function(todo){
            todo.completed=!todo.completed;
            save();
            this.setState({newTodo:''});
        },
        //对于所有的事件进行选中或者清除选中
        toggleAll:function(){
            todos.forEach(function(todo){
                todo.completed=mark;
            });
            mark = !mark;
            save();
            this.setState({newTodo:''});
        },
        //当点击删除标志时进行删除当前事件
        destroy:function(todo){
            for(var i=0;i<todos.length;i++){
                if(todos[i].id==todo.id){
                    todos.splice(i,1);
                }
            }
            save();
            this.setState({newTodo:''});
        },
        //当点击删除所有已完成的按钮时执行的操作
        clearCompleted:function(){
            var newTodos=[];
            for(var i=0;i<todos.length;i++){
                if(todos[i].completed!==true){
                    newTodos.push(todos[i]);
                }
            }
            todos=newTodos;
            save();
            this.setState({newTodo:''});
        },
        selectAll:function(){
             todoShowing='all';
            this.setState({newTodo:''});
        },
        selectActive:function(){
             todoShowing='active';
            this.setState({newTodo:''});
        },
        selectCompleted:function(){
             todoShowing='completed';
            this.setState({newTodo:''});
        },
        //渲染的组件内容
        render:function(){
            var main,todoFooter;
            //对于当前剩余的条数进行计数
            //todos=[{"text":"123","id":1476319528445,"completed":true},{"text":"123","id":1476320520048,"completed":false}];
            var activeTodoCount = todos.reduce(function (accum, todo) {
                return todo.completed ? accum : accum + 1;
            }, 0);
            //获得已经完成的条数
            var completedCount = todos.length-activeTodoCount;
            //在这里对数组中的数据进行循环展示
            var showTodos = todos.filter(function(todo){
                switch (todoShowing){
                    case 'all':
                        return todo;
                    case "active":
                        return !todo.completed;
                    case "completed":
                        return todo.completed;
                }

            });
            console.log(showTodos);
            var todoItems=showTodos.map(function(todo){
                return(
                    <TodoItem
                        key={todo.id}
                        value={todo.text}
                        todo={todo}
                        editing={this.state.editing === todo.id}
                        todoToToggle={this.todoStateToggle.bind(this,todo)}
                        onDestroy = {this.destroy.bind(this,todo)}
                        />
                );
            },this);
            if(todos.length){
                main=(
                    <div className="main">
                        <input
                            type="checkbox"
                            className="toggle-all"
                            onChange = {this.toggleAll}
                            //当所剩的条数为0时,选中该按钮
                            checked={!activeTodoCount}
                            />
                        <ul className="todo-list">
                            {todoItems}
                        </ul>
                    </div>
                );
                todoFooter=(
                    <Footer
                        clearCompleted={this.clearCompleted.bind(this)}
                        activeCount={activeTodoCount}
                        completedCount={completedCount}
                        selectAllItems={this.selectAll.bind(this)}
                        selectActive={this.selectActive.bind(this)}
                        selectCompleted={this.selectCompleted.bind(this)}
                        />
                )
            }

            return (
                <div>
                    <header className="header">
                        <h1> 记事本 </h1>
                        <input
                            type="text"
                            className="new-todo"
                            value={this.state.newTodo}
                            placeholder="来吧,少年"
                            onChange={this.handleChange}
                            onKeyDown={this.handleNewTodoKeyDown}
                            />
                    </header>
                    {main}
                    {todoFooter}
                </div>
            );
        }
    });
    React.render(
        <TodoApp />,
        document.getElementById('example')
    );
})();
