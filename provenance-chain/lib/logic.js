/**
 * Transaction processor function.
 * @param {org.example.mynetwork.AssetTransfer} tx The sample transaction instance.
 * @transaction
 */

 async function assetTransfer(tx) {
     const oldOwnerId = tx.asset.ownerId;
     tx.asset.ownerId = tx.newOwnerId;

    //  tx.asset.owner = getFactory().newRelationship('org.example.mynetwork', 'Customer', String(tx.asset.ownerId))



     const oldOwnerList = tx.asset.ownerList;
     console.log('oldOwnerList' + oldOwnerList);
     var tempNewList = tx.asset.ownerList + ',' + tx.newOwnerList.toString();
     var newList = tempNewList.split(',');
     console.log('newOwnerList' + newList);
     tx.asset.ownerList = newList;

     if(tx.asset.futurePlateNumber != "_"){
         tx.asset.plateNumber = tx.asset.futurePlateNumber;
         tx.asset.futurePlateNumber = "_";
     }

     tx.asset.verified = "true";
     tx.asset.futureOwner = "_";

     // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Vehicle');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);


    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'AssetTransferEvent');
    event.asset = tx.asset;
    event.oldOwnerId = oldOwnerId;
    event.newOwnerId = tx.newOwnerId;
    event.oldOwnerList = oldOwnerList;
    event.newOwnerList = newList
    // event.oldOwner = oldOwner;
    // event.newOwner = tx.newOwner;
    emit(event);


 }

 /**
 * Transaction processor function.
 * @param {org.example.mynetwork.DealerUpdation} tx The sample transaction instance.
 * @transaction
 */

 async function dealerUpdation(tx){
     const oldDealerName = tx.asset.dealerName;
     tx.asset.dealerName = tx.newDealerName;

     const oldDealerId = tx.asset.dealerId;
     tx.asset.dealerId = tx.newDealerId;


      // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Vehicle');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('org.example.mynetwork', 'DealerUpdationEvent');
    event.asset = tx.asset;
    event.newDealerName = tx.newDealerName;
    event.oldDealerName = oldDealerName;
    event.newDealerId = tx.newDealerId
    event.oldDealerId = oldDealerId;
    emit(event);

 }


 /**
 * Transaction processor function.
 * @param {org.example.mynetwork.AssetTransferRequest} tx The sample transaction instance.
 * @transaction
 */

 async function assetTransferRequest(tx){
     const oldFutureOwner = tx.asset.futureOwner;
     tx.asset.futureOwner = tx.futureOwner;

     const transactionPlateNumber = tx.futurePlateNumber

     if(transactionPlateNumber != "_")
        tx.asset.futurePlateNumber = transactionPlateNumber;

    tx.asset.verified = "false";

    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Vehicle');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('org.example.mynetwork', 'AssetTransferRequestEvent');
    event.asset = tx.asset;
    event.oldFutureOwner = oldFutureOwner;
    event.newFutureOwner = tx.asset.futureOwner;

 }





 /**
 * Transaction processor function.
 * @param {org.example.mynetwork.RecordService} tx The sample transaction instance.
 * @transaction
 */

async function recordService(tx) {
    
    const oldServiceRecord = tx.asset.serviceRecord;
    var tempNewList = tx.asset.serviceRecord + ',' + tx.newServiceRecord.toString();
    var newList = tempNewList.split(',');
    tx.asset.serviceRecord = newList;

    
    // Get the asset registry for the asset.
   const assetRegistry = await getAssetRegistry('org.example.mynetwork.Vehicle');
   // Update the asset in the asset registry.
   await assetRegistry.update(tx.asset);


   // Emit an event for the modified asset.
   let event = getFactory().newEvent('org.example.mynetwork', 'RecordServiceEvent');
   event.asset = tx.asset;
   event.oldServiceRecord = oldServiceRecord;
   event.newServiceRecord = newList
   emit(event);


}
