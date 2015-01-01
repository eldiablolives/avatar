function Avatar(elementId, offsetX, offsetY) {
    var self = this;

    self.av = document.getElementById(elementId);
    self.bgx = offsetX;
    self.bgy = offsetY;
    var start;
    //var aw, ah;

    this.pw = null;
    this.ph = null;


    self.av.addEventListener('dragenter', function (e) {
        self.av.classList.add('avatar-over');
    });

    self.av.addEventListener('dragleave', function (e) {
        self.av.classList.remove('avatar-over');
    });

    self.av.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    self.av.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var container = self.av.parentNode;

        //alert('parent: ' + container.offsetWidth + ' x ' + container.offsetHeight);
        //
        var dt = e.dataTransfer;
        var files = dt.files;

        if (files.length >= 1) {
            while (self.av.firstChild)
                self.av.removeChild(self.av.firstChild);

            var reader = new FileReader();

            reader.addEventListener("loadend", function (e) {
                    var img = new Image();
                    img.src = e.target.result;

                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    ctx.canvas.width = container.offsetWidth;
                    ctx.canvas.height = container.offsetHeight;

                    ctx.drawImage(img, 0, 0);

                    //container.appendChild(canvas);
                    //canvas.style.position = 'relative';
                    //canvas.style.top = (av.offsetHeight * -1) + 'px';
                    self.av.style.backgroundImage = 'url(' + e.target.result + ')';

                    self.img = img;
                    self.paint(img);

                }
            );

            reader.readAsDataURL(files[0]);
        }
    });

    self.av.addEventListener('mousedown', function (e) {
        self.tracking = true;
        start = {x: e.clientX, y: e.clientY};
    });

    self.av.addEventListener('mouseup', function (e) {
        self.tracking = false;
    });

    self.av.addEventListener('mouseleave', function (e) {
        self.tracking = false;
    });

    self.av.addEventListener('mousemove', function (e) {
        var diffx, diffy;
        if (self.tracking) {
            if (e.clientX < start.x) {
                diffx = (start.x - e.clientX) * -1;
            } else {
                diffx = (e.clientX - start.x);
            }

            if (e.clientY < start.y) {
                diffy = (start.y - e.clientY) * -1;
            } else {
                diffy = (e.clientY - start.y);
            }

            start.x += diffx;
            start.y += diffy;

            if(self.bgx >= offsetX && diffx > 0)
                self.bgx = offsetX;
            else if(self.bgx + self.pw + diffx <= self.aw + offsetX)
                self.bgx = (self.pw - self.aw) * -1 + offsetX;
            else
                self.bgx += diffx;

            if(self.bgy >= offsetY && diffy > 0)
                self.bgy = offsetY;
            else if(self.bgy + self.ph + diffy <= self.ah + offsetY)
                self.bgy = (self.ph - self.ah) * -1 + offsetY;
            else
                self.bgy += diffy;

            self.bgy += diffy;

            self.av.style.backgroundPosition = self.bgx + ' ' + self.bgy;
        }
    });
}

Avatar.prototype = {
    crop: function(url, callback) {
        if(!callback) {
            callback = url;
            url = null;
        }
    },
    paint: function(img, zoom) {
        if(!img)
            img = this.img;
        var self = this;
        var h = img.height;
        var w = img.width;
        self.aw = self.av.offsetWidth;
        self.ah = self.av.offsetHeight;
        var imgor = w / h;
        var avor = self.aw / self.ah;
        var ratio;

        if (imgor > avor)
            ratio = h / self.ah;
        else
            ratio = w / self.aw;

        if(zoom)
        ratio = ratio / zoom;

        if (ratio >= 0) {
            self.pw = w / ratio;
            self.ph = h / ratio;
        } else {
            self.pw = w * ratio;
            self.ph = h * ratio;
        }

        self.av.style.backgroundSize = self.pw + 'px ' + self.ph + 'px';
        self.av.style.backgroundPosition = self.bgx + ' ' + self.bgy;
    }
};
