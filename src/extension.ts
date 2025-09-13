import * as vscode from 'vscode';

class MyPanelProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'myExtension.panelView';

  constructor(private readonly context: vscode.ExtensionContext) { }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    console.log('正在解析 webview 视图...');

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getHtml();
    console.log('Webview HTML 已设置');
  }

  private getHtml(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>前端组件库</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                'vs-bg': '#1e1e1e',
                'vs-surface': '#2d2d30',
                'vs-border': '#3e3e42',
                'vs-hover': '#404040'
              }
            }
          }
        }
      </script>
    </head>
    <body class="bg-vs-bg text-white min-h-screen overflow-hidden">
      <!-- 顶部分类导航 -->
      <div class="bg-vs-surface border-b border-vs-border">
        <div class="flex items-center h-12 px-4 space-x-6">
          <button class="category-tab active text-white font-medium" onclick="showCategory('page')" data-category="page">页面</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('nav')" data-category="nav">导航栏</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('window')" data-category="window">窗口</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('button')" data-category="button">按钮</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('text')" data-category="text">文字</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('sound')" data-category="sound">音效</button>
          <button class="category-tab text-gray-400 hover:text-white" onclick="showCategory('effect')" data-category="effect">特效</button>
        </div>
      </div>

      <!-- 二级分类导航 -->
      <div class="bg-vs-surface border-b border-vs-border">
        <div class="flex items-center h-10 px-4 space-x-3 overflow-x-auto">
          <!-- 页面分类的子分类 -->
          <div class="sub-category-group category-page flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('page', 'all')">全部</button>
          </div>

          <!-- 导航栏分类的子分类 -->
          <div class="sub-category-group category-nav hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('nav', 'bottom')">下方导航栏</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('nav', 'side')">侧面导航栏</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('nav', 'top')">上方导航栏</button>
          </div>

          <!-- 窗口分类的子分类 -->
          <div class="sub-category-group category-window hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('window', 'open')">开启</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('window', 'close')">关闭</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('window', 'loop')">循环</button>
          </div>

          <!-- 按钮分类的子分类 -->
          <div class="sub-category-group category-button hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('button', 'text')">文字按钮</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('button', 'image')">图片按钮</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('button', 'icon')">图标按钮</button>
          </div>

          <!-- 文字分类的子分类 -->
          <div class="sub-category-group category-text hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('text', 'enter')">入场</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('text', 'exit')">出场</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('text', 'loop')">循环</button>
          </div>

          <!-- 音效分类的子分类 -->
          <div class="sub-category-group category-sound hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('sound', 'click')">点击</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'confirm')">确定</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'cancel')">取消</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'switch')">切换</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'success')">成功</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'fail')">失败</button>
            <button class="sub-category-tab text-gray-400 hover:text-white px-3 py-1 rounded text-sm" onclick="showSubCategory('sound', 'style')">风格</button>
          </div>

          <!-- 特效分类的子分类 -->
          <div class="sub-category-group category-effect hidden flex space-x-3">
            <button class="sub-category-tab active bg-vs-hover px-3 py-1 rounded text-sm text-white" onclick="showSubCategory('effect', 'all')">全部</button>
          </div>
        </div>
      </div>

      <!-- 横向滚动组件区域 -->
      <div class="flex-1 p-4">
        <div class="flex space-x-4 overflow-x-auto pb-4" id="componentContainer" style="scrollbar-width: thin;">
          
          <!-- 页面分类组件 -->
          <div class="component-item category-page sub-all flex-none" 
               data-code='<div class="animate-slide-up opacity-0 translate-y-4 transition-all duration-500 ease-out hover:opacity-100 hover:translate-y-0">向上滑动内容</div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group overflow-hidden">
              <div class="w-full h-full bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 flex items-end justify-center relative">
                <div class="w-12 h-3 bg-blue-400 rounded-t-sm mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">向上滑动</p>
          </div>

          <div class="component-item category-page sub-all flex-none" 
               data-code='<div class="animate-slide-right opacity-0 -translate-x-4 transition-all duration-500 ease-out hover:opacity-100 hover:translate-x-0">向右滑动内容</div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group overflow-hidden">
              <div class="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 flex items-center justify-start relative">
                <div class="w-3 h-12 bg-blue-400 rounded-r-sm ml-1 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">向右滑动</p>
          </div>

          <div class="component-item category-page sub-all flex-none" 
               data-code='<div class="transform transition-transform duration-300 hover:scale-110">放大内容</div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="w-8 h-8 bg-blue-400 rounded group-hover:w-12 group-hover:h-12 transition-all duration-300"></div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">放大</p>
          </div>

          <!-- 导航栏分类组件 -->
          <div class="component-item category-nav sub-bottom flex-none hidden" 
               data-code='<div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg"><div class="flex justify-around py-2"><button class="flex flex-col items-center"><span class="text-xs">首页</span></button><button class="flex flex-col items-center"><span class="text-xs">分类</span></button></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-end justify-center pb-2">
                <div class="flex space-x-2">
                  <div class="w-6 h-1 bg-blue-400 rounded"></div>
                  <div class="w-6 h-1 bg-gray-500 rounded"></div>
                  <div class="w-6 h-1 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">底部导航</p>
          </div>

          <div class="component-item category-nav sub-side flex-none hidden" 
               data-code='<div class="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg"><nav class="p-4"><ul class="space-y-2"><li><a href="#" class="block py-2 px-4 rounded hover:bg-gray-100">菜单1</a></li><li><a href="#" class="block py-2 px-4 rounded hover:bg-gray-100">菜单2</a></li></ul></nav></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-start pl-2">
                <div class="flex flex-col space-y-1">
                  <div class="w-16 h-1 bg-blue-400 rounded"></div>
                  <div class="w-14 h-1 bg-gray-500 rounded"></div>
                  <div class="w-18 h-1 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">侧边导航</p>
          </div>

          <div class="component-item category-nav sub-top flex-none hidden" 
               data-code='<div class="fixed top-0 left-0 right-0 bg-white shadow-lg"><div class="flex justify-between items-center px-4 py-3"><div class="font-bold">Logo</div><nav class="hidden md:flex space-x-6"><a href="#" class="hover:text-blue-600">首页</a><a href="#" class="hover:text-blue-600">关于</a></nav></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-start justify-center pt-2">
                <div class="flex space-x-2">
                  <div class="w-6 h-1 bg-blue-400 rounded"></div>
                  <div class="w-6 h-1 bg-gray-500 rounded"></div>
                  <div class="w-6 h-1 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">顶部导航</p>
          </div>

          <!-- 窗口分类组件 -->
          <div class="component-item category-window sub-open flex-none hidden" 
               data-code='<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"><div class="bg-white rounded-lg p-6 transform scale-95 transition-transform duration-300 hover:scale-100"><h3 class="text-lg font-bold mb-4">模态窗口</h3><p>这是一个模态窗口内容</p></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="w-20 h-14 bg-gray-600 rounded border-2 border-blue-400 relative">
                  <div class="absolute top-1 left-1 right-1 h-2 bg-blue-400 rounded-t"></div>
                  <div class="absolute top-4 left-2 right-2 bottom-2 bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">打开窗口</p>
          </div>

          <div class="component-item category-window sub-open flex-none hidden" 
               data-code='<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start opacity-0 transition-opacity duration-300 hover:opacity-100"><div class="bg-white rounded-r-lg p-6 w-80 h-full transform -translate-x-full           transition-transform duration-300 hover:translate-x-0"><h3 class="text-lg font-bold mb-4">左滑入窗口</h3><p>这是一个从左侧滑          入的窗口。</p></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all          group">
              <div class="w-full h-full flex items-center justify-start pl-2 overflow-hidden">
                <div class="w-16 h-12 bg-gray-600 rounded-r border-2 border-blue-400 relative transform -translate-x-2          group-hover:translate-x-0 transition-transform duration-300">
                  <div class="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">左滑入窗口</p>
          </div>

          <div class="component-item category-window sub-open flex-none hidden" 
               data-code='<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end opacity-0 transition-opacity           duration-300 hover:opacity-100"><div class="bg-white rounded-l-lg p-6 w-80 h-full transform translate-x-full          transition-transform duration-300 hover:translate-x-0"><h3 class="text-lg font-bold mb-4">右滑入窗口</h3><p>这是一个从右侧滑        入的窗口。</p></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all          group">
              <div class="w-full h-full flex items-center justify-end pr-2 overflow-hidden">
                <div class="w-16 h-12 bg-gray-600 rounded-l border-2 border-blue-400 relative transform translate-x-2           group-hover:translate-x-0 transition-transform duration-300">
                  <div class="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">右滑入窗口</p>
          </div>

          <div class="component-item category-window sub-open flex-none hidden" 
               data-code='<div class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center opacity-0 transition-opacity           duration-300 hover:opacity-100"><div class="bg-white rounded-b-lg p-6 w-1/2 h-48 transform -translate-y-full          transition-transform duration-300 hover:translate-y-0"><h3 class="text-lg font-bold mb-4">下滑入窗口</h3><p>这是一个从顶部下        滑入的窗口。</p></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all          group">
              <div class="w-full h-full flex items-start justify-center pt-2 overflow-hidden">
                <div class="w-20 h-10 bg-gray-600 rounded-b border-2 border-blue-400 relative transform -translate-y-2          group-hover:translate-y-0 transition-transform duration-300">
                  <div class="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">上滑入窗口</p>
          </div>

          <!-- 弹跳弹窗（预览 + 可复制） -->
          <div class="component-item category-window sub-open flex-none hidden"
               data-code='
          <button onclick="showBounce()">打开弹窗</button>
            
          <div id="bounceModal" class="modal">
            <div class="modal-content bounce-in">
              <span class="close" onclick="closeModal("bounceModal")">&times;</span>
              <p>这是一个弹跳弹窗</p>
            </div>
          </div>
            
          <style>
          .modal {
            display:none; position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,0.5); justify-content:center; align-items:center;
          }
          .modal-content {
            background:#1e293b; color:white; padding:20px; border-radius:8px;
            min-width:200px; text-align:center;
          }
          .bounce-in { animation: bounceIn 0.6s cubic-bezier(0.68,-0.55,0.27,1.55); }
          @keyframes bounceIn {
            0% {opacity:0; transform:scale(0.3);}
            50% {opacity:1; transform:scale(1.1);}
            70% {transform:scale(0.9);}
            100% {transform:scale(1);}
          }
          .close { cursor:pointer; float:right; }
          </style>
            
          <script>
          function showBounce(){
            document.getElementById("bounceModal").style.display="flex";
          }
          function closeModal(id){
            document.getElementById(id).style.display="none";
          }
          </script>'>
            
            <!-- 🔹 预览方块 -->
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border 
                        hover:border-blue-500 cursor-pointer flex items-center justify-center">
              <div class="w-16 h-10 bg-sky-500 rounded text-white flex items-center 
                          justify-center animate-bounce">
                弹窗
              </div>
            </div>
            
            <p class="text-xs text-center mt-2 text-gray-300">打开弹窗</p>
          </div>

          <!-- 按钮分类组件 -->
          <div class="component-item category-button sub-text flex-none hidden" 
               data-code='<button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200">点击按钮</button>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="bg-blue-500 text-white text-xs px-4 py-2 rounded group-hover:bg-blue-600 transition-colors">按钮</div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">文字按钮</p>
          </div>

          <div class="component-item category-button sub-image flex-none hidden" 
               data-code='<button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"><img src="icon.png" alt="Icon" class="w-8 h-8"/></button>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="w-10 h-8 bg-gray-400 rounded flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                  <div class="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">图片按钮</p>
          </div>

          <!-- 文字分类组件 -->
          <div class="component-item category-text sub-enter flex-none hidden" 
               data-code='<div class="opacity-0 animate-fade-in-up">淡入向上文字</div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="text-xs text-blue-400 transform translate-y-2 opacity-70 group-hover:translate-y-0 group-hover:opacity-100 transition-all">文字</div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">入场动画</p>
          </div>

          <div class="component-item category-text sub-exit flex-none hidden" 
               data-code='<div class="opacity-100 animate-fade-out-down">淡出向下文字</div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="text-xs text-blue-400 transform translate-y-0 opacity-100 group-hover:translate-y-2 group-hover:opacity-0 transition-all">文字</div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">出场动画</p>
          </div>

          <div class="component-item category-text sub-loop flex-none hidden"
            data-code='
            <div class="typing-container text-white text-lg">
              <span id="typing-text"></span><span class="cursor">|</span>
            </div>

            <style>
            .typing-container {
              display: inline-flex;
              align-items: center;
              font-family: monospace;
            }
            .cursor {
              display: inline-block;
              margin-left: 2px;
              animation: blink 1s step-end infinite;
              color: #3b82f6; /* Tailwind blue-500 */
            }
            @keyframes blink {
              50% { opacity: 0; }
            }
            </style>

            <script>
            (function() {
              const text = "打字机效果演示";
              const el = document.getElementById("typing-text");
              let i = 0;
              function type() {
                if (i < text.length) {
                  el.textContent += text.charAt(i);
                  i++;
                  setTimeout(type, 150); // 打字速度
                }
              }
              type();
            })();
            </script>'>
              <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border 
                          hover:border-blue-500 cursor-pointer transition-all group">
                <div class="w-full h-full flex items-center justify-center">
                  <p class="text-xs text-blue-400">打字机</p>
                </div>
              </div>
              <p class="text-xs text-center mt-2 text-gray-300">打字机</p>
            </div>

          <!-- 音效分类组件 -->
          <div class="component-item category-sound sub-click flex-none hidden" 
               data-code='<button onclick="playClickSound()" class="bg-blue-500 text-white px-4 py-2 rounded">点击音效</button>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-ping"></div>
                  <div class="text-xs text-gray-400">点击</div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">点击音效</p>
          </div>

          <!-- 特效分类组件 -->
          <div class="component-item category-effect sub-all flex-none hidden" 
               data-code='<div class="relative"><div class="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div><div class="relative bg-blue-600 rounded-full w-4 h-4"></div></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="relative">
                  <div class="absolute w-4 h-4 bg-blue-400 rounded-full group-hover:animate-ping"></div>
                  <div class="relative w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">脉冲效果</p>
          </div>

          <div class="component-item category-effect sub-all flex-none hidden" 
               data-code='<div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>'>
            <div class="w-32 h-20 bg-vs-surface rounded-lg border border-vs-border hover:border-blue-500 cursor-pointer transition-all group">
              <div class="w-full h-full flex items-center justify-center">
                <div class="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full group-hover:animate-spin"></div>
              </div>
            </div>
            <p class="text-xs text-center mt-2 text-gray-300">加载动画</p>
          </div>

        </div>
      </div>

      <!-- 复制成功提示 -->
      <div id="copyToast" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg transform translate-x-full transition-transform duration-300 z-50">
        代码已复制！
      </div>

      <script>
        let currentCategory = 'page';
        let currentSubCategory = 'all';

        function showCategory(category) {
          currentCategory = category;
          
          // 更新主分类标签样式
          document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active', 'text-white');
            tab.classList.add('text-gray-400');
          });
          event.target.classList.add('active', 'text-white');
          event.target.classList.remove('text-gray-400');

          // 显示/隐藏对应的子分类组
          document.querySelectorAll('.sub-category-group').forEach(group => {
            group.classList.add('hidden');
          });
          
          const activeSubGroup = document.querySelector('.sub-category-group.category-' + category);
          if (activeSubGroup) {
            activeSubGroup.classList.remove('hidden');
            
            // 激活第一个子分类
            const firstSubTab = activeSubGroup.querySelector('.sub-category-tab');
            if (firstSubTab) {
              // 重置所有子分类标签
              activeSubGroup.querySelectorAll('.sub-category-tab').forEach(tab => {
                tab.classList.remove('active', 'bg-vs-hover', 'text-white');
                tab.classList.add('text-gray-400');
              });
              // 激活第一个
              firstSubTab.classList.add('active', 'bg-vs-hover', 'text-white');
              firstSubTab.classList.remove('text-gray-400');
              
              // 获取子分类名称并显示对应组件
              const subCategory = firstSubTab.textContent.toLowerCase() === '全部' ? 'all' : 
                                firstSubTab.getAttribute('onclick').match(/'([^']+)'/g)[1].replace(/'/g, '');
              currentSubCategory = subCategory;
            }
          }

          updateComponentsVisibility();
        }

        function showSubCategory(category, subCategory) {
          currentSubCategory = subCategory;
          
          // 更新子分类标签样式
          const activeSubGroup = document.querySelector('.sub-category-group.category-' + category);
          if (activeSubGroup) {
            activeSubGroup.querySelectorAll('.sub-category-tab').forEach(tab => {
              tab.classList.remove('active', 'bg-vs-hover', 'text-white');
              tab.classList.add('text-gray-400');
            });
            event.target.classList.add('active', 'bg-vs-hover', 'text-white');
            event.target.classList.remove('text-gray-400');
          }

          updateComponentsVisibility();
        }

        function updateComponentsVisibility() {
          document.querySelectorAll('.component-item').forEach(item => {
            const isCurrentCategory = item.classList.contains('category-' + currentCategory);
            const isCurrentSubCategory = currentSubCategory === 'all' || item.classList.contains('sub-' + currentSubCategory);
            
            if (isCurrentCategory && isCurrentSubCategory) {
              item.classList.remove('hidden');
            } else {
              item.classList.add('hidden');
            }
          });
        }

        function copyToClipboard(text) {

          const fulltex = text.replace(/\\n/g, '\\n').replace(/\\t/g, '\\t');
          
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          // 显示复制提示
          const toast = document.getElementById('copyToast');
          toast.classList.remove('translate-x-full');
          toast.classList.add('translate-x-0');
          
          setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
          }, 2000);
        }

        // 为组件添加点击复制事件
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('click', function() {
              const code = this.getAttribute('data-code');
              copyToClipboard(code);
            });
          });
        });

        // 自定义滚动条样式
        const style = document.createElement('style');
        style.textContent = \`
          #componentContainer::-webkit-scrollbar {
            height: 8px;
          }
          #componentContainer::-webkit-scrollbar-track {
            background: #2d2d30;
            border-radius: 4px;
          }
          #componentContainer::-webkit-scrollbar-thumb {
            background: #404040;
            border-radius: 4px;
          }
          #componentContainer::-webkit-scrollbar-thumb:hover {
            background: #4a4a4a;
          }
        \`;
        document.head.appendChild(style);
      </script>
    </body>
    </html>
    `;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('样式库扩展正在激活...');

  const provider = new MyPanelProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MyPanelProvider.viewType,
      provider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  console.log('扩展激活成功！');
}

export function deactivate() {
  console.log('扩展已停用');
}