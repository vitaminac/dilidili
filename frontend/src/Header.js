import React from 'react';
export function Header(props) {
    return (
        <div id="main-header">
            <div class="main-header-nav">
                <div class="main-header-image" style={{ "background-image": `url('${props.banner}')` }}></div>
                <div class="header-container needstick">
                    <ul class="main-header-nav-body">
                        <li class="nav-li floatleft now">
                            <a href="#/">首页</a>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/1">动画</a>
                            <div class="nav-li-list">
                                <a href="#/sort/24">MAD·AMV</a>
                                <a href="#/sort/25">MMD·3D</a>
                                <a href="#/sort/47">短片·手书·配音</a>
                                <a href="#/sort/27">综合</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/bangumiindex">番剧</a>
                            <div class="nav-li-list">
                                <a href="#/sort/33">连载动画</a>
                                <a href="#/sort/32">完结动画</a>
                                <a href="#/sort/152">官方延伸</a>
                                <a href="#/sort/153">国产动画</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/3">音乐</a>
                            <div class="nav-li-list">
                                <a href="#/sort/31">翻唱</a>
                                <a href="#/sort/30">VOCALOID·UTAU</a>
                                <a href="#/sort/29">三次元音乐</a>
                                <a href="#/sort/28">同人音乐</a>
                                <a href="#/sort/54">OP/ED/OST</a>
                                <a href="#/sort/130">音乐选集</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/129">舞蹈</a>
                            <div class="nav-li-list">
                                <a href="#/sort/20">宅舞</a>
                                <a href="#/sort/154">三次元舞蹈</a>
                                <a href="#/sort/156">舞蹈教程</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/4">游戏</a>
                            <div class="nav-li-list">
                                <a href="#/sort/17">单机联机</a>
                                <a href="#/sort/65">网游·电竞</a>
                                <a href="#/sort/136">音游</a>
                                <a href="#/sort/19">Mugen</a>
                                <a href="#/sort/121">GMV</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/36">科技</a>
                            <div class="nav-li-list">
                                <a href="#/sort/37">纪录片</a>
                                <a href="#/sort/124">趣味科普人文</a>
                                <a href="#/sort/122">野生技术协会</a>
                                <a href="#/sort/39">演讲·公开课</a>
                                <a href="#/sort/95">数码</a>
                                <a href="#/sort/98">机械</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/5">娱乐</a>
                            <div class="nav-li-list">
                                <a href="#/sort/153">搞笑</a>
                                <a href="#/sort/138">生活</a>
                                <a href="#/sort/75">动物圈</a>
                                <a href="#/sort/76">美食圈</a>
                                <a href="#/sort/71">综艺</a>
                                <a href="#/sort/137">娱乐圈</a>
                                <a href="#/sort/131">Korea相关</a>
                            </div>
                        </li>

                        <li class="nav-li floatleft">
                            <a href="#/sort/119">鬼畜</a>
                            <div class="nav-li-list">
                                <a href="#/sort/22">鬼畜调教</a>
                                <a href="#/sort/26">音MAD</a>
                                <a href="#/sort/126">人力VOCALOID</a>
                                <a href="#/sort/127">教程演示</a>
                            </div>
                        </li>
                    </ul>

                    <div class="header-search floatright">
                        <form action="#" id="search_form" method="post">
                            <input name="keyword" id="search_content" placeholder="这里搜索" />
                            <input type="submit" value="搜 索" title="搜索" class="btn-search" />
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}