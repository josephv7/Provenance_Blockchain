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