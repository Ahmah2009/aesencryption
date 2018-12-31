'use strict';

angular.module('app', []).controller('Controller', function($scope) {
    var nosalt = CryptoJS.enc.Hex.parse("0000000000000000");
    $scope.enc=function(){
        var nakedKey=$scope.key;
        var encrypted = $scope.text;
       
        var key = CryptoJS.enc.Utf8.parse(nakedKey);
        var nakeHexKey= key.toString(CryptoJS.enc.Hex)
        if(nakeHexKey.length<32){
            nakeHexKey= nakeHexKey+Array(32-nakeHexKey.length+1).join(0)
        }
        key= CryptoJS.enc.Hex.parse(nakeHexKey);
        //encrypt
        var r = CryptoJS.AES.encrypt(encrypted, key, {
            keySize: 16,
            iv: nosalt,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        });
        $scope.result=r.toString();
    }

    $scope.dec= function() {
        var nakedKey=$scope.key;
        var encrypted = $scope.text;
        var key = CryptoJS.enc.Utf8.parse(nakedKey);
        var nakeHexKey= key.toString(CryptoJS.enc.Hex)
        if(nakeHexKey.length<32){
            nakeHexKey= nakeHexKey+Array(32-nakeHexKey.length+1).join(0)
        }
        key= CryptoJS.enc.Hex.parse(nakeHexKey);
        //encrypt
        var r = CryptoJS.AES.decrypt(encrypted, key, {
            keySize: 16,
            iv: nosalt,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        });
        try {
            $scope.result=r.toString(CryptoJS.enc.Utf8);
          }
          catch(err) {
            $scope.result="Invalid Data";
          }
       
    }
});