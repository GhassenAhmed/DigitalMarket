import 'dart:convert';
import 'package:deliverymarket/Models/Commande.dart';
import 'package:deliverymarket/Models/Product.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:deliverymarket/Models/User.dart';
import "package:location/location.dart";


class CommandeService{



  CommandeService(){
    
  }



  List<Commande> Commandes=[];

  Product product=Product(Name: "", image: "", id: -1);

  List<Product> products=[];

  String url="http://10.0.2.2:8888"; 

  Future<List<Commande>> GetCommandes() async{
    try{
      final response=await http.get(Uri.parse("$url/GESTIONCOMMANDE-SERVICE/Commande/GetCommandeDispo?size=500"));
      if(response.statusCode==200){
        final jsonData=jsonDecode(response.body);
          /*for (var item in jsonData['docs']) {
              Commandes.add(Commande.fromJson(item));
              print(item);
           }*/
         Commandes = jsonData['docs'].map<Commande>((json) => Commande.fromJson(json)).toList();
         return Commandes;
      }else{
        return [];
      }
    }catch(e){
      print(e);
      return [];
    }
  }

Future<Product> GetInfoProduct(int id) async {
  try {
    final response = await http.get(Uri.parse("$url/PRODUCT-SERVICE/products/GetDetailsProd?id=" + id.toString()));
    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      product=Product(Name: jsonData["name"], image: jsonData["image"], id: jsonData["id"]);
      products.add(product);
      return product;
    } else {
     return Product(Name: "", image: "", id: -1);
    }
  } catch (e) {
     return Product(Name: "", image: "", id: -1);
  }
}

Future<String> TakenCommande(String num,String latitude,String longitude)async{

  final request={
    "email":"bizo@gmail.com",
    "num":num,
    "Location":{
        "latitude":latitude,
        "longitude":longitude,
    },
  };
   try{
      final response=await http.post(
        Uri.parse("$url/GESTIONCOMMANDE-SERVICE/Commande/AddLivraison"),
        body:jsonEncode(request),
        headers: {
          "Content-Type":"application/json"
        }
      );
      print(response.body);
      if(response.statusCode==201){
        return "Added With Sucess";
      }else{
        return "Failed Taken";
      }
   }catch(e){
      return "Error";
   }
}


}