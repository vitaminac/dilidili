import React from 'react';
export function Footer(props) {
    return (
        <div id="footer">
            <div class="area-inner">
                <div class="about-block floatleft">
                    <div class="about-item left floatleft">
                        <div class="about-title">About</div>
                        <div class="about-links">
                            <a href="http://www.bilibili.com">BiliBili弹幕视频网</a>
                            <a href="https://github.com/WhiteBlue/bilibili-html5/blob/master/update.md">更新日志</a>
                            <a href="https://github.com/WhiteBlue/bilibili-html5">项目地址</a>
                        </div>
                    </div>
                    <div class="about-item floatleft">
                        <div class="about-title">WhiteBlue</div>
                        <div class="about-links">
                            <a href="http://blog.shiroblue.cn">Blog</a>
                            <a href="https://github.com/WhiteBlue">Github</a>
                        </div>
                    </div>
                    <div class="about-item right floatleft">
                        <div class="about-title">空位</div>
                        <div class="about-links">
                            <a href="#">没想好放什么...</a>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    );
}