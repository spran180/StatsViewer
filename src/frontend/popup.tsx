/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DataDisplayCF from "./data/dataDisplayCF";
import DataDisplayLC from "./data/dataDisplayLC";
import Navbar from "./components/navbar";

const Popup = () => {
    const [lcUsername, setLCUsername] = useState<string>('');
    const [cfUsername, setCFUsername] = useState<string>('');
    const [lcData, setLCData] = useState<any>(null);
    const [cfData, setCFData] = useState<any>(null);

    useEffect(() => {
        chrome.storage.sync.get(['cfUsername', 'lcUsername'], (data) => {
            const savedLCUsername = data.lcUsername;
            const savedCFUsername = data.cfUsername;
            if (savedLCUsername) {
                setLCUsername(savedLCUsername);
                addDataLC(savedLCUsername);
            }
            if (savedCFUsername) {
                setCFUsername(savedCFUsername);
                addDataCF(savedCFUsername);
            }
        });
    }, []);
    
    const saveLCUsernames = () => {
        chrome.storage.sync.set({ lcUsername }, () => {
            addDataLC(lcUsername);
        });
    };

    const saveCFUsernames = () => {
        chrome.storage.sync.set({ cfUsername }, () => {
            addDataCF(cfUsername);
        });
    };

    const addDataLC = async (username: string) => {
        try{
            console.log(`Starting to add LC data for ${username}`);
            await new Promise<void>((resolve) => {
                chrome.runtime.sendMessage({ action: 'addDataLC', username }, (response) => {
                    console.log('Response from addDataLC:', response);
                    resolve()
                });
            }); 
            
            console.log('Calling getDataLC for', username);
            chrome.runtime.sendMessage({ action: 'getDataLC', username }, response => {
                if (response && !response.error) {
                    setLCData(response);
                } else {
                    console.error('Error fetching LC data:', response.error);
                }
            });
        }
        catch(error){
            console.error('Error fetching LC data:', error);
        }
        
    };

    const addDataCF = async (username: string) => {
        try {
            console.log(`Starting to add CF data for ${username}`);
    
            await new Promise<void>((resolve) => {
                chrome.runtime.sendMessage({ action: 'addDataCF', username }, (response) => {
                    console.log('Response from addDataCF:', response);
                    resolve();
                });
            });
    
            console.log('Calling getDataCF for', username);
    
            chrome.runtime.sendMessage({ action: 'getDataCF', username }, (response) => {
                console.log('Response from getDataCF:', response);
    
                if (response && !response.error) {
                    setCFData(response);
                } else {
                    console.error('Error fetching CF data:', response?.error);
                }
            });
        } catch (error) {
            console.error('Error during CF data fetching:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="components">
                <form>
                    <input
                        type="text"
                        value={lcUsername}
                        onChange={(e) => setLCUsername(e.target.value)}
                        placeholder="LeetCode Username"
                    />
                    <button onClick={saveLCUsernames}>Fetch</button>
                    
                </form>
                {lcData && <DataDisplayLC data={lcData} title="Leetcode Data" />}
                <form>
                    <input
                        type="text"
                        value={cfUsername}
                        onChange={(e) => setCFUsername(e.target.value)}
                        placeholder="Codeforces Username"
                    />
                    <button onClick={saveCFUsernames}>Fetch</button>
                </form>
                {cfData && <DataDisplayCF data={cfData} title="Codeforces Data" />}
            </div>
        </>
    );
};

export default Popup;
