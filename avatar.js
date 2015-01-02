function Avatar(elementId, params) {
    var self = this;
    self.params = params;

    self.av = document.getElementById(elementId);

    var offsetX = params.offsetX || params.border * -1 || 0;
    var offsetY = params.offsetY || params.border * -1 || 0;

    self.bgx = offsetX;
    self.bgy = offsetY;

    self.av.addEventListener('dragenter', function (e) {
        self.av.classList.add('avatar-over');
    });

    self.av.addEventListener('dragleave', function (e) {
        self.av.classList.remove('avatar-over');
    });

    self.av.addEventListener('dragover', function (e) {
        self.av.classList.add('avatar-over');
        e.stopPropagation();
        e.preventDefault();
    });

    self.av.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        if (files.length >= 1) {
            while (self.av.firstChild)
                self.av.removeChild(self.av.firstChild);

            var reader = new FileReader();

            reader.addEventListener("loadend", function (e) {
                    var img = new Image();
                    img.src = e.target.result;

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

            if (self.bgx >= offsetX && diffx > 0)
                self.bgx = offsetX;
            else if (self.bgx + self.pw + diffx <= self.aw + offsetX)
                self.bgx = (self.pw - self.aw) * -1 + offsetX;
            else
                self.bgx += diffx;

            if (self.bgy >= offsetY && diffy > 0)
                self.bgy = offsetY;
            else if (self.bgy + self.ph + diffy <= self.ah + offsetY)
                self.bgy = (self.ph - self.ah) * -1 + offsetY;
            else
                self.bgy += diffy;

            start.x += diffx;
            start.y += diffy;

            self.av.style.backgroundPosition = self.bgx + ' ' + self.bgy;
        }
    });
}

Avatar.prototype = {
    crop: function (url, callback) {
        var self = this;
        if (!callback) {
            callback = url;
            url = null;
        }

        var canvas = document.createElement('canvas');

        var bgx = self.bgx;
        var bgy = self.bgy;

        var offsetX = self.params.offsetX || self.params.border || 0;
        var offsetY = self.params.offsetY || self.params.border || 0;
        var offsetW = self.params.offsetW || self.params.border || 0;
        var offsetH = self.params.offsetH || self.params.border || 0;

        if(bgx < 0)
            bgx = bgx *-1;
        if(bgy < 0)
            bgy = bgy *-1;

        var sx = bgx * self.ratio;
        var sy = bgy * self.ratio;
        var sw = (self.aw - offsetW - offsetX) * self.ratio;
        var sh = (self.ah - offsetH - offsetY) * self.ratio;

        canvas.width = sw;
        canvas.height = sh;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, sx, sy, sw, sh, 0, 0, sw, sh );
        return ctx.canvas.toDataURL('image/png');

    },
    paint: function (img, zoom) {
        var self = this;
        if (!img)
            img = self.img;

        if (zoom)
            self.zoom = zoom;

        var h = img.height;
        var w = img.width;
        self.aw = self.av.offsetWidth;
        self.ah = self.av.offsetHeight;
        var imgor = w / h;
        var avor = self.aw / self.ah;

        if (imgor > avor)
            self.ratio = h / self.ah;
        else
            self.ratio = w / self.aw;

        if (zoom)
            self.ratio = self.ratio / zoom;

        if (self.ratio >= 0) {
            self.pw = w / self.ratio;
            self.ph = h / self.ratio;
        } else {
            self.pw = w * self.ratio;
            self.ph = h * self.ratio;
        }

        self.av.style.backgroundSize = self.pw + 'px ' + self.ph + 'px';
        self.av.style.backgroundPosition = self.bgx + ' ' + self.bgy;
    }
};
